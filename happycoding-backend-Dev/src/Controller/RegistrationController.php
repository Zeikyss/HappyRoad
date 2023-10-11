<?php

namespace App\Controller;

use App\Entity\User;
use App\Security\EmailVerifier;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Security\Security;
use DateTime;
use DateTimeImmutable;
use Symfony\Component\Mailer\MailerInterface;

class RegistrationController extends AbstractController
{
    private EmailVerifier $emailVerifier;
    private $validator;
    private Security $security;

    public function __construct(EmailVerifier $emailVerifier, ValidatorInterface $validator, Security $security)
    {
        $this->emailVerifier = $emailVerifier;
        $this->validator = $validator;
        $this->security = $security;
    }

    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $errors = [];

        $jsonData = $request->getContent();
        try {
            $user = $serializer->deserialize($jsonData, User::class, "json", [ 'groups' => ['register']]);
            if (empty($user->getEmail())) {
                $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
                return $this->json($errors, 400);
            }
            if (empty($user->getPassword())) {
                $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
                return $this->json($errors, 400);
            }
            if (empty($user->getLastName())) {
                $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
                return $this->json($errors, 400);
            }
            if (empty($user->getFirstName())) {
                $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
                return $this->json($errors, 400);
            }
            if (empty($user->getPseudo())) {
                $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
                return $this->json($errors, 400);
            }
            if (empty($user->getBirthDate())) {
                $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
                return $this->json($errors, 400);
            }

            $user
                ->setEmail($this->security->secureData($user->getEmail()))
                ->setPassword($this->security->secureData($user->getPassword()))
                ->setLastName($this->security->secureData($user->getLastName()))
                ->setFirstName($this->security->secureData($user->getFirstName()))
                ->setPseudo($this->security->secureData($user->getPseudo()))
                ->setBirthDate($user->getBirthDate())
                ->setTotalCredits(50)
                ->setRoles(['ROLE_USER'])
                ->setCreatedAt(new DateTimeImmutable())
                ->setLastActivity(new DateTimeImmutable())
                ->setReport(false)
                ->setIsVerified(false);
            $invalid =  $this->validator->validate($user, null, null);
            $violation = [];
            foreach ($invalid as $err) {
                $violation[] = $err->getMessage();
            }
            if (count($violation) > 0) {
                $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
            } 
        }
        catch (NotEncodableValueException $e) {
            $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
            return $this->json($errors, 400);
        };

        $searchEmail = $entityManager->getRepository(User::class)->findOneByEmail($user->getEmail());
        if ($searchEmail) {
            $errors["emailErr"] = "e-mail déjà existant";
        }

        $searchPseudo = $entityManager->getRepository(User::class)->findOneByPseudo($user->getPseudo());
        if ($searchPseudo) {
            $errors["pseudoErr"] = "Pseudo déjà existant";
        }

        if (empty($errors)) {
            $hashPassword = $userPasswordHasher->hashPassword($user, $user->getPassword());
            $user->setPassword($hashPassword);

            $entityManager->persist($user);
            $entityManager->flush();

            $this->emailVerifier->sendEmailConfirmation(
                'app_verify_email',
                $user,
                (new TemplatedEmail())
                    ->from(new Address('contact@happyroad.com', 'Contact HappyRoad'))
                    ->to($user->getEmail())
                    ->subject('Please Confirm your Email')
                    ->htmlTemplate('registration/confirmation_email.html.twig')
            );
            return $this->json(["inscription" => "Votre inscription est bien effectuée !"], 201);
        }
        else {
            return $this->json($errors, 400);
        }

    }

    
    #[Route('/verify/email', name: 'app_verify_email')]
    public function verifyUserEmail(Request $request, EntityManagerInterface $entityManager, MailerInterface $mailer): Response
    {
        $id = $request->query->get('id');
        $user=$entityManager->getRepository(User::class)->findOneById($id);
        $uri = 'https://127.0.0.1:8000/verify/email?expires=' . urlencode($request->query->get('expires')) .
         '&signature=' . urlencode($request->query->get('signature')) .
         '&token=' . urlencode($request->query->get('token'));
        
        try {
            $this->emailVerifier->handleEmailConfirmation($uri, $user);
        } catch (VerifyEmailExceptionInterface $exception) {
            return $this->json(['verify_email_error', $exception->getReason()], 400);
        }

        $email = (new TemplatedEmail())
            ->from(new Address('contact@happyroad.com', 'Contact HappyRoad'))
            ->to($user->getEmail())
            ->subject('Please Confirm your Email')
            ->htmlTemplate('registration/confirmed_email.html.twig');
        $context = $email->getContext();
        $context['prenom'] = $user->getFirstName();
        $context['lien'] = 'http://localhost:5173/auth';
        $email->context($context);
        $mailer->send($email);
        return $this->json(['email vérifié'], 201);
    }

}
