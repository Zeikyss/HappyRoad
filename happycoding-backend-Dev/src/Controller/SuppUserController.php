<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class SuppUserController extends AbstractController
{
    #[Route('/suppuser', name: 'app_suppuser')]
    public function sendMail(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, MailerInterface $mailer): Response
    {
        // $id = $request->query->get('id');
        // $user = $entityManager->getRepository(User::class)->findOneById($id);
        $jsonData = $request->getContent();
        $user = $serializer->deserialize($jsonData, User::class, "json");
        if (empty($user->getEmail())) {
            return $this->json(400);
        }
        if (empty($user->getUsername())) {
            return $this->json(400);
        }

        $email = (new TemplatedEmail())
            ->from($user->getEmail())
            ->to('contact@happyroad.com')
            ->subject('Confirmation suppression de compte')
            ->htmlTemplate('suppUser/supp_user.html.twig');
        $context = $email->getContext();
        $context['username'] = $user->getUsername();
        $email->context($context);
        $mailer->send($email);
        return $this->json(['Demande de suppression de compte envoyé'], 201);
    }
}
