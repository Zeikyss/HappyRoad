<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Security\ProfileSecurity;
use App\Entity\User;
use App\Entity\Comment;
use App\Entity\Car;
use App\Entity\Option;
use App\Entity\Music;
use DateTimeImmutable;

class ProfileController extends AbstractController
{
    private $jwtManager;
    private $tokenStorageInterface;
    private ProfileSecurity $profileSecurity;

    public function __construct(JWTTokenManagerInterface $jwtManager, TokenStorageInterface $tokenStorageInterface, ProfileSecurity $profileSecurity)
    {
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
        $this->profileSecurity = $profileSecurity;
    }


    /**
     * Function profileView
     * 
     * Description :
     * Retoune un JSON contenant les données pour l'affichage du profil de l'utilisateur connecté
     * L'email de l'utilisateur est stocké dans le token
     * 
     * Requête :
     *  Méthode : GET
     *  Route : /hr/profile/view
     * 
     * 
     * Exemple de JSON retourné (Code HTTP : 200) :
     * {
     *  "pseudo": "Elisabeth69",
     *  "avatar": "avatar_01234567890.jpg",
     *  "car": [
     *      {
     *          "carPicture": "car_0123456789.png",
     *          "brand": "CITROEN",
     *          "model": "C3 PICASSO",
     *          "color": "Bleu",
     *          "places": 3,
     *          "smallBaggage": 3,
     *          "largeBaggage": 0
     *      }
     *  ],
     *  "options": {
     *      "silence": true,
     *      "smoke": true,
     *      "animals": true,
     *      "music": true,
     *      "musicOption": [
     *          "Rock",
     *          "Jazz"
     *      ]
     *  },
     *  "comments": {
     *      "total": 6,
     *      "page": 1,
     *      "last": 2,
     *      "averageScore": 3.67,
     *      "comments": [
     *          {
     *              "createdAt": "2023-06-22 10-06-07",
     *              "score": 4,
     *              "comments": "Nulla reprehenderit elit mollit eiusmod culpa ad velit sunt elit. Sunt ex nisi qui ullamco deserunt ex irure tempor veniam est ullamco incididunt dolor. Ea dolor eu eu aliqua mollit sit aute aute occaecat ullamco do tempor. Magna aliquip veniam non voluptate aliquip sunt tempor. Deserunt eiusmod ut mollit ullamco occaecat exercitation dolore in."
     *          },
     *          {
     *              "createdAt": "2023-06-21 01-06-26",
     *              "score": 4,
     *              "comments": "Velit laborum voluptate culpa consequat voluptate dolore veniam deserunt ut consectetur. Velit ipsum eu est esse quis reprehenderit elit. Nulla commodo amet et sit culpa.\r\n\r\nSint id nostrud dolor exercitation. Id cupidatat irure commodo proident dolore veniam esse laborum officia id amet nostrud enim. Cupidatat dolor id quis dolore non fugiat. Culpa commodo cillum sunt eu sit. Laborum dolor exercitation amet consequat laborum. Consectetur nostrud dolor ut fugiat aliqua.\r\n"
     *          },
     *          {
     *              "createdAt": "2023-06-21 12-06-20",
     *              "score": 5,
     *              "comments": "Elit consectetur ipsum duis cillum commodo aliqua ipsum fugiat reprehenderit est officia dolore sint proident. Ut veniam qui do pariatur commodo excepteur culpa culpa velit velit irure enim. Minim occaecat duis exercitation dolor. Tempor sit est reprehenderit eu laboris. Laborum aute pariatur veniam fugiat.\n\nEu ex incididunt commodo veniam veniam ex ea tempor nostrud nisi duis est et. Excepteur consequat commodo do cupidatat eu esse non sit non esse dolor eiusmod cupidatat ex. Minim fugiat id proident laboris incididunt pariatur excepteur excepteur voluptate sunt veniam et. Ullamco amet enim occaecat dolor in commodo deserunt nostrud. Ullamco non est sit enim dolore tempor dolore aliquip ad duis."
     *          },
     *          {
     *              "createdAt": "2023-06-20 12-06-07",
     *              "score": 4,
     *              "comments": "Architecto veritatis officia minus tempora velit voluptatem. Aperiam et sunt ullam aut nostrum. Et sed fugit architecto dicta reprehenderit architecto. Velit et perspiciatis quisquam nisi accusantium inventore.\n\nDolore eum corporis omnis unde ut sed ipsa. Molestiae ea recusandae facere magnam quasi. Et maxime et beatae fugiat in odit neque. Est voluptatem rerum consectetur maxime ex. Aut sed reiciendis culpa blanditiis ut.\n\nFugiat corporis ex velit deserunt tenetur omnis. Magni voluptas cupiditate voluptatem at. Nulla laboriosam minima et at esse. Dolorum eos omnis perferendis eum similique."
     *          },
     *          {
     *              "createdAt": "2023-06-19 12-06-07",
     *              "score": 2,
     *              "comments": "Quo eum nostrum qui esse. Aperiam quod expedita tenetur in incidunt. Qui aliquid nostrum magnam ea molestias consequatur.\n\nRatione quae neque voluptatem totam eos alias rerum. Et quia dolorem sequi iusto laboriosam aut. Itaque quod dolorem possimus dicta numquam nesciunt corporis.\n\nAliquam officia pariatur ad est laboriosam dignissimos hic quas. Accusantium eum vero et ab. Quos qui nihil dolores repellat est libero ea. Ut aut magni quia quod aut sit. Quaerat tempore incidunt tempore nostrum qui ea pariatur."
     *          }
     *      ]
     *  }
     * }
     * 
     * "Car" est envoyé si l'utilisateur a renseigné les informations concernants sa voiture (si plusieurs voitures sont enregistrées, elles sont toutes envoyées - Normalement, il en existe qu'une)
     * 
     * "options" est envoyé si l'utilisateur a renseigné ses options
     * "musicOption" est envoyé seulement si "music" vaut true
     * 
     * "comments" contient les avis sur l'utilisateur. Seul les 5 premiers sont envoyés
     * "total" contient le nombre total d'avis sur l'utilisateur
     * "page", "last", "averageScore" et "comments" sont envoyés au moins un avis existe
     * "page" vaut 1 et correspond à la première page de avis
     * "last" contient le nombre total de page pour les avis (5 par page)
     * "averageScore" contient la moyenne des notes pour l'utilisateur (arrondit 2 chiffres après la virgule)
     * "comments" est un tableau qui contient les 5 premiers avis (s'ils existent) sous forme d'objet.
     * 
     * 
     * Liste JSON envoyé en cas d'erreur sur le token (Code HTTP : 401) :
     * Identification incorrecte : {"code": 401, "message": "Invalid credentials."}
     * Session a expirée : {"code":401,"message":"Expired JWT Token"}
     * Token non valide : {"code":401,"message":"Invalid JWT Token"}
     * Token absent : {"code":401,"message":"JWT Token not found"}
     * 
     * 
     * Remarque :
     * Le test pour savoir si l'utilisateur existe est inutile car déjà géré avec le token
     * Le JSON {"userErr": "L'utilisateur n'existe pas !"}, Code HTTP : 400) n'est donc jamais envoyé
     * 
     */
    #[Route('/hr/profile/view', name: 'app_profile_view', methods: ['GET'])]
    public function profileView(EntityManagerInterface $entityManager): jsonResponse
    {
        $return = [];
        $decodedJwtToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $email = $decodedJwtToken['username'];
        $user = $entityManager->getRepository(User::class)->findoneby(['email' => $email]);
        if ($user) {
            $return['pseudo'] = $user->getPseudo();
            $return['avatar'] = $user->getAvatar();

            if (count($user->getCar()) > 0) {
                foreach ($user->getCar() as $car) {
                    $c['carPicture'] = $car->getCarPicture();
                    $c['brand'] = $car->getModel()->getBrand()->getName();
                    $c['model'] = $car->getModel()->getName();
                    $c['color'] = $car->getColor();
                    $c['places'] = $car->getPlaces();
                    $c['smallBaggage'] = $car->getSmallBaggage();
                    $c['largeBaggage'] = $car->getLargeBaggage();
                    $return['car'][] = $c;
                }
            }

            if (count($user->getOptions()) > 0) {
                $return['options']['silence'] = $user->getOptions()[0]->isSilence();
                $return['options']['smoke'] = $user->getOptions()[0]->isSmoke();
                $return['options']['animals'] = $user->getOptions()[0]->isAnimals();
                if ($user->getOptions()[0]->isMusic()) {
                    $return['options']['music'] = true;
                    if (count($user->getOptions()[0]->getMusicOption()) > 0) {
                        foreach ($user->getOptions()[0]->getMusicOption() as $music) {
                            $return['options']['musicOption'][] = $music->getGenre();
                        }
                    }
                }
                else {
                    $return['options']['music'] = false;
                }
            }

            if (count($user->getComment()) > 0) {
                $return['comments']['total'] = count($user->getComment());
                $return['comments']['page'] = 1;
                $return['comments']['last'] = ceil(count($user->getComment()) / 5);
                $comment = $entityManager->getRepository(Comment::class)->findAverageByUser($user->getId());
                $return['comments']['averageScore'] = round($comment, 2);
                $comments = $entityManager->getRepository(Comment::class)->findBy(['owner' => $user->getId()], ['createdAt' => 'DESC'], 5);
                foreach ($comments as $comment) {
                    $com['createdAt'] = $comment->getCreatedAt();
                    $com['score'] = $comment->getScore();
                    $com['comments'] = $comment->getComment();
                    $return['comments']['comments'][] = $com;
                }
            }
            else {
                $return['comments']['total'] = 0;
            }

            return $this->json($return, 200);
        }
        else {
            $errors["userErr"] = "L'utilisateur n'existe pas !";
            return $this->json($errors, 400);
        }

    }


    /**
     * Function profileViewUser
     * 
     * Description :
     * Retoune un JSON contenant les données pour l'affichage du profil d'un utilisateur
     * Le pseudo de l'utilisateur est stocké dans l'URL
     * 
     * Requête :
     *  Méthode : GET
     *  Route : /hr/profile/view/{pseudo}
     * 
     * Exemple de JSON retourné si l'utilisateur existe (Code HTTP : 200) :
     * Le format du JSON envoyé est le même que pour la fonction profileView
     * 
     * 
     * JSON retourné su l'utilisateur n'existe pas (Code HTTP : 400) :
     * {"userErr": "L'utilisateur n'existe pas !"}
     * 
     * 
     * Liste JSON envoyé en cas d'erreur sur le token (Code HTTP : 401)
     * Identification incorrecte : {"code": 401, "message": "Invalid credentials."}
     * Session a expirée : {"code":401,"message":"Expired JWT Token"}
     * Token non valide : {"code":401,"message":"Invalid JWT Token"}
     * Token absent : {"code":401,"message":"JWT Token not found"}
     * 
     */
    #[Route('/hr/profile/view/{pseudo}', name: 'app_profile_view_user', methods: ['GET'])]
    public function profileViewUser($pseudo, EntityManagerInterface $entityManager): jsonResponse
    {
        $return = [];
        $user = $entityManager->getRepository(User::class)->findoneby(['pseudo' => $pseudo]);
        if ($user) {
            $return['pseudo'] = $user->getPseudo();
            $return['avatar'] = $user->getAvatar();

            if (count($user->getCar()) > 0) {
                foreach ($user->getCar() as $car) {
                    $c['carPicture'] = $car->getCarPicture();
                    $c['brand'] = $car->getModel()->getBrand()->getName();
                    $c['model'] = $car->getModel()->getName();
                    $c['color'] = $car->getColor();
                    $c['places'] = $car->getPlaces();
                    $c['smallBaggage'] = $car->getSmallBaggage();
                    $c['largeBaggage'] = $car->getLargeBaggage();
                    $return['car'][] = $c;
                }
            }

            if (count($user->getOptions()) > 0) {
                $return['options']['silence'] = $user->getOptions()[0]->isSilence();
                $return['options']['smoke'] = $user->getOptions()[0]->isSmoke();
                $return['options']['animals'] = $user->getOptions()[0]->isAnimals();
                if ($user->getOptions()[0]->isMusic()) {
                    $return['options']['music'] = true;
                    if (count($user->getOptions()[0]->getMusicOption()) > 0) {
                        foreach ($user->getOptions()[0]->getMusicOption() as $music) {
                            $return['options']['musicOption'][] = $music->getGenre();
                        }
                    }
                }
                else {
                    $return['options']['music'] = false;
                }
            }

            if (count($user->getComment()) > 0) {
                $return['comments']['total'] = count($user->getComment());
                $return['comments']['page'] = 1;
                $return['comments']['last'] = ceil(count($user->getComment()) / 5);
                $comment = $entityManager->getRepository(Comment::class)->findAverageByUser($user->getId());
                $return['comments']['averageScore'] = round($comment, 2);
                $comments = $entityManager->getRepository(Comment::class)->findBy(['owner' => $user->getId()], ['createdAt' => 'DESC'], 5);
                foreach ($comments as $comment) {
                    $com['createdAt'] = $comment->getCreatedAt()->format("Y-m-d h-m-s");
                    $com['score'] = $comment->getScore();
                    $com['comments'] = $comment->getComment();
                    $return['comments']['comments'][] = $com;
                }
            }
            else {
                $return['comments']['total'] = 0;
            }

            return $this->json($return, 200);
        }
        else {
            $errors["userErr"] = "L'utilisateur n'existe pas !";
            return $this->json($errors, 400);
        }

    }


    /**
     * Function profileComments
     * 
     * Description :
     * Retourne un JSON contenant les avis sur un utilisateur
     * Les avis sont triés par date et envoyés par 5 suivant la pagination
     * Le paramètre page si présent dans l'URL définit la pagination
     * Si le paramètre page est absent dans l'URL est equivalent à page = 1
     * Si le paramètre page est supérieur au nombre total de pages, page = nombre total de page
     * Le pseudo de l'utilisateur est stocké dans l'URL
     * 
     * 
     * Requête :
     *  Méthode : GET
     *  Route : /hr/profile/comments/{pseudo}
     *  Paramètre URL : page
     * 
     * 
     * Exemple de JSON retourné si l'utilisateur existe et possède au moins 1 avis (Code HTTP : 200) : 
     * {
     *  "comments": {
     *      "total": 6,
     *      "page": 2,
     *      "last": 2,
     *      "averageScore": 3.67,
     *      "comments": [
     *          {
     *              "createdAt": "2023-06-18 12-06-07",
     *              "score": 3,
     *              "comments": "Voluptate quidem exercitationem animi quod. Voluptatem ipsum distinctio soluta aut. Maiores ad quia minima illum eius. Est enim quas expedita atque.\n\nVoluptatem nobis quaerat ea. Minima consequatur odit ipsum labore. Earum dolores molestiae sapiente omnis ipsam.\n\nVoluptatem doloremque accusamus sunt sit ut voluptates. Sint aut qui minus perferendis sed sit rerum. Alias sed et quidem libero id eos. Numquam consequatur non et unde qui autem voluptate. Quos sint occaecati voluptate eum expedita quis error."
     *          }
     *      ]
     *  }
     * }
     * 
     * "comments" contient les avis sur l'utilisateur correspondant à la page demandée
     * "total" contient le nombre total d'avis sur l'utilisateur
     * "page" correspond à la page courante des avis
     * "last" contient le nombre total de page pour les avis (5 par page)
     * "averageScore" contient la moyenne des notes pour l'utilisateur (arrondit 2 chiffres après la virgule)
     * "comments" est un tableau qui contient les 5 avis maximum de la page sous forme d'objet.
     * 
     * 
     * JSON retourné si l'utilisateur existe et ne possède pas d'avis (Code HTTP : 200) :
     * {
     *  "comments": {
     *  "total": 0
     *  }
     * }
     * 
     * 
     * JSON retourné si l'utilisateur n'existe pas (Code HTTP : 400) :
     * {"userErr": "L'utilisateur n'existe pas !"}
     * 
     * 
     * Liste JSON envoyé en cas d'erreur sur le token (Code HTTP : 401) :
     * Identification incorrecte : {"code": 401, "message": "Invalid credentials."}
     * Session a expirée : {"code":401,"message":"Expired JWT Token"}
     * Token non valide : {"code":401,"message":"Invalid JWT Token"}
     * Token absent : {"code":401,"message":"JWT Token not found"}
     * 
     */
    #[Route('/hr/profile/comments/{pseudo}', name: 'app_profile_comments', methods: ['GET'])]
    public function profileComments($pseudo, Request $request, EntityManagerInterface $entityManager): jsonResponse
    {
        $return = [];

        $page=(int)$request->query->get('page');
        if (isset($page)) {
            $page = $page > 0 ? $page : 1;
        }
        else {
            $page = 1;
        }

        $user = $entityManager->getRepository(User::class)->findoneby(['pseudo' => $pseudo]);
        if ($user) {
            if (count($user->getComment()) > 0) {
                $last = ceil(count($user->getComment()) / 5);
                $page = $page <= $last ? $page : $last;
                $offset = ($page - 1) * 5;

                $return['comments']['total'] = count($user->getComment());
                $return['comments']['page'] = $page;
                $return['comments']['last'] = $last;
                $comment = $entityManager->getRepository(Comment::class)->findAverageByUser($user->getId());
                $return['comments']['averageScore'] = round($comment, 2);
                $comments = $entityManager->getRepository(Comment::class)->findBy(['owner' => $user->getId()], ['createdAt' => 'DESC'], 5, $offset);
                foreach ($comments as $comment) {
                    $com['createdAt'] = $comment->getCreatedAt()->format("Y-m-d h-m-s");
                    $com['score'] = $comment->getScore();
                    $com['comments'] = $comment->getComment();
                    $return['comments']['comments'][] = $com;
                }
            }
            else {
                $return['comments']['total'] = 0;
            }

            return $this->json($return, 200);
        }
        else {
            $errors["userErr"] = "L'utilisateur n'existe pas !";
            return $this->json($errors, 400);
        }

    }


    /**
     * Function profileUpdateRead
     * 
     * Description :
     * Retoune un JSON contenant les données pour préremplir le formulaire de modification du profil de l'utilisateur connecté
     * L'email de l'utilisateur est stocké dans le token
     * 
     * Requête :
     *  Méthode : GET
     *  Route : /hr/profile/update/read
     * 
     * JSON envoyé si utilisateur trouvé dans la BDD (Code HTTP : 200) :
     * {
     *   "email": "eleonore.lenoir@payet.com",
     *   "pseudo": "Elisabeth69",
     *   "firstName": "Elisabeth",
     *   "lastName": "Dupont",
     *   "avatar": "avatar_0123456789.jpg",
     *   "birthDate": "2002-05-22",
     *   "totalCredits": 8400,
     *   "car": [
     *      {
     *          "carPicture": "car_0123456789.png",
     *          "brand": "CITROEN",
     *          "model": "C3 PICASSO",
     *          "color": "Bleu",
     *          "places": 3,
     *          "smallBaggage": 3,
     *          "largeBaggage": 0
     *       }
     *   ],
     *   "options": {
     *      "silence": true,
     *      "smoke": true,
     *      "animals": true,
     *      "music": true,
     *      "musicOption": [
     *          "Rock",
     *          "Jazz"
     *      ]
     *   }
     * }
     * 
     * "avatar", "car" et "options" sont envoyés seulement si l'utilisateur a déjà renseigné ces données
     * "musicOption" est envoyé seulement si "music" vaut true
     * 
     * 
     * Liste JSON envoyé en cas d'erreur sur le token (Code HTTP : 401) :
     * Identification incorrecte : {"code": 401, "message": "Invalid credentials."}
     * Session a expirée : {"code":401,"message":"Expired JWT Token"}
     * Token non valide : {"code":401,"message":"Invalid JWT Token"}
     * Token absent : {"code":401,"message":"JWT Token not found"}
     * 
     * 
     * Remarque : 
     * Le test pour savoir si l'utilisateur existe est inutile car déjà géré avec le token
     * Le JSON {"userErr": "L'utilisateur n'existe pas !"}, Code HTTP : 400) n'est donc jamais envoyé
     * 
     */
    #[Route('/hr/profile/update/read', name: 'app_profile_update_read', methods: ['GET'])]
    public function profileUpdateRead(EntityManagerInterface $entityManager): jsonResponse
    {
        $return = [];
        $decodedJwtToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $email = $decodedJwtToken['username'];
        $user = $entityManager->getRepository(User::class)->findoneby(['email' => $email]);
        if ($user) {
            $return['email'] = $user->getEmail();
            $return['pseudo'] = $user->getPseudo();
            $return['firstName'] = $user->getFirstName();
            $return['lastName'] = $user->getLastName();
            $return['avatar'] = $user->getAvatar();
            $return['birthDate'] = $user->getBirthDate()->format("Y-m-d");;
            $return['totalCredits'] = $user->getTotalCredits();

            if (count($user->getCar()) > 0) {
                foreach ($user->getCar() as $car) {
                    $c['carPicture'] = $car->getCarPicture();
                    $c['brand'] = $car->getModel()->getBrand()->getName();
                    $c['model'] = $car->getModel()->getName();
                    $c['color'] = $car->getColor();
                    $c['places'] = $car->getPlaces();
                    $c['smallBaggage'] = $car->getSmallBaggage();
                    $c['largeBaggage'] = $car->getLargeBaggage();
                    $return['car'][] = $c;
                }
            }
            
            if (count($user->getOptions()) > 0) {
                $return['options']['silence'] = $user->getOptions()[0]->isSilence();
                $return['options']['smoke'] = $user->getOptions()[0]->isSmoke();
                $return['options']['animals'] = $user->getOptions()[0]->isAnimals();
                if ($user->getOptions()[0]->isMusic()) {
                    $return['options']['music'] = true;
                    if (count($user->getOptions()[0]->getMusicOption()) > 0) {
                        foreach ($user->getOptions()[0]->getMusicOption() as $music) {
                            $return['options']['musicOption'][] = $music->getGenre();
                        }
                    }
                }
                else {
                    $return['options']['music'] = false;
                }
            }

            return $this->json($return, 200);
        }
        else {
            $errors["userErr"] = "L'utilisateur n'existe pas !";
            return $this->json($errors, 400);
        }

    }


    /**
     * Function profileUpdateWrite
     * 
     * Description :
     * permet la modification d'un ou plusieurs éléments du profil de l'utilisateur
     * L'email de l'utilisateur est stocké dans le token
     * Les informations recues et à changer sont contenues dans le JSON
     * Retourne un JSON informant de la réussite ou non de la requête
     * 
     * Requête :
     *  Méthode : PATCH
     *  Route : /hr/profile/update/write
     * 
     * 
     * Exemple JSON attendu :
     * {
     *   "email": "eleonore.lenoir@payet.com",
     *   "pseudo": "Elisabeth69",
     *   "firstName": "Elisabeth",
     *   "lastName": "Dupont",
     *   "avatar": "avatar_0123456789.jpg",
     *   "birthDate": "2002-05-22",
     *   "car": {
     *      "carPicture": "car_0123456789.png",
     *      "brand": "CITROEN",
     *      "model": "C3 PICASSO",
     *      "color": "Bleu",
     *      "places": 3,
     *      "smallBaggage": 3,
     *      "largeBaggage": 0
     *   },
     *   "options": {
     *      "silence": true,
     *      "smoke": true,
     *      "animals": true,
     *      "music": true,
     *      "musicOption": [
     *          "Rock",
     *          "Jazz"
     *      ]
     *   }
     * }
     * 
     * "email", "pseudo", "firstName", "lastName", "avatar", "birthDate", "car et "options" apparaissent normalement dans le JSON seulement s'ils doivent être modifiés
     * "carPicture", "brand", "model", "color", "places", "smallBaggage" et "largeBaggage" appraissent normalement dans "car" seulement s'ils doivent êtres modifiés
     * "silence", "smoke", "animals", "music" et "musicOption" apparaissent normalement dans "options" seulement s'ils doivent être modifiés
     * 
     * 
     * JSON envoyé en cas d'erreur sur le format des données envoyées (Code HTTP : 400) :
     * {"jsonErr": "Le format des données envoyées n'est pas correct !"}
     * 
     * 
     * JSON envoyé en cas de données non valides envoyées (Code HTTP : 400) :
     * {"validErr": "Un ou plusieurs champs ne sont pas valides"}
     * 
     * 
     * Exemple JSON envoyé en cas de succès de la requete (Code HTTP : 200) :
     * {
     *   "alreadyExist": [
     *      "email",
     *      "pseudo"
     *   ],
     *   "identicalOld": [
     *      "firstName",
     *      "lastName"
     *   ],
     *   "change": [
     *      "avatar",
     *      "birthDate"
     *   ]
     * "identicalOldCar": [
     *      "carPicture",
     *      "color"
     *   ],
     *   "changeCar": [
     *      "places",
     *      "smallBaggage"
     *   ]
     * "identicalOldOptions": [
     *      "silence",
     *      "music"
     *   ],
     *   "changeOptions": [
     *      "smoke",
     *      "animals"
     *   ]
     *  }
     * 
     * "alreadyExist" est présent si l'email ou le pseudo sont déjà utilsés par un autre utilisateur
     * "identicalOld" est présent si un champ envoyé pour modifier l'entité "user" est identique à l'ancien
     * "change" est présent si le changement d'un champ de l'entité "user" est effectué
     * "identicalOldCar" est présent si un champ envoyé pour modifier l'entité "car" est identique à l'ancien
     * "changeCar" est présent si le changement d'un champ de l'entité "car" est effectué
     * "identicalOldOptions" est présent si un champ envoyé pour modifier l'entité "options" est identique à l'ancien
     * "changeOptions" est présent si le changement d'un champ de l'entité "options" est effectué
     * 
     * Ces différents tableau contiennent le ou les champs concernés
     * 
     * 
     * Liste JSON envoyé en cas d'erreur sur le token (Code HTTP : 401) :
     * Identification incorrecte : {"code": 401, "message": "Invalid credentials."}
     * Session a expirée : {"code":401,"message":"Expired JWT Token"}
     * Token non valide : {"code":401,"message":"Invalid JWT Token"}
     * Token absent : {"code":401,"message":"JWT Token not found"}
     * 
     * 
     * Remarque : 
     * Le test pour savoir si l'utilisateur existe est inutile car déjà géré avec le token
     * Le JSON {"userErr": "L'utilisateur n'existe pas !"}, Code HTTP : 400) n'est donc jamais envoyé
     * 
     */
    #[Route('/hr/profile/update/write', name: 'app_profil_update_write', methods: ['PATCH'])]
    public function profileUpdateWrite(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): jsonResponse
    {
        $decodedJwtToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $email = $decodedJwtToken['username'];

        $jsonData = $request->getContent();
        $data = json_decode($jsonData, true);
        if ($data && count($data) > 0 && count($data) < 9) {
            $keysAccept = ['email', 'pseudo', 'firstName', 'lastName', 'avatar', 'birthDate', 'car', 'options'];
            $keysCarAccept = ['carPicture', 'brand', 'model', 'color', 'places', 'smallBaggage', 'largeBaggage'];
            $keysOptionsAccept = ['silence', 'smoke', 'animals', 'music', 'musicOption'];

            $keys = array_keys($data);
            if (array_diff($keys, $keysAccept) == []) {
                $user = $entityManager->getRepository(User::class)->findoneby(['email' => $email]);
                if ($user) {
                    $errors = [];
                    $return = [];

                    // Traitement email
                    if (in_array('email', $keys)) {
                        $data['email'] = $this->profileSecurity->secureData($data['email']);
                        $contraints = $this->profileSecurity->emailContraints();
                        $invalid = $validator->validate(['email' => $data['email']], $contraints);
                        $violation = [];
                        foreach ($invalid as $err) {
                            $violation[] = $err->getMessage();
                        }
                        if (count($violation) > 0) {
                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                            return $this->json($errors, 400);
                        }
                        else {
                            if ($user->getEmail() != $data['email']) {
                                $searchEmail = $entityManager->getRepository(User::class)->findoneby(['email' => $data['email']]);
                                if ($searchEmail) {
                                    $return['alreadyExist'][] = 'email';
                                }
                                else {
                                    $user->setEmail($data['email']);
                                    $return['change'][] = 'email';
                                }
                            }
                            else {
                                $return['identicalOld'][] = 'email';
                            }
                        }
                    }

                    // Traitement pseudo
                    if (in_array('pseudo', $keys)) {
                        $data['pseudo'] = $this->profileSecurity->secureData($data['pseudo']);
                        $contraints = $this->profileSecurity->pseudoContraints();
                        $invalid = $validator->validate(['pseudo' => $data['pseudo']], $contraints);
                        $violation = [];
                        foreach ($invalid as $err) {
                            $violation[] = $err->getMessage();
                        }
                        if (count($violation) > 0) {
                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                            return $this->json($errors, 400);
                        }
                        else {
                            if ($user->getPseudo() != $data['pseudo']) {
                                $searchPseudo = $entityManager->getRepository(User::class)->findoneby(['pseudo' => $data['pseudo']]);
                                if ($searchPseudo) {
                                    $return['alreadyExist'][] = 'pseudo';
                                }
                                else {
                                    $user->setPseudo($data['pseudo']);
                                    $return['change'][] = 'pseudo';
                                }
                            }
                            else {
                                $return['identicalOld'][] = 'pseudo';
                            }
                        }
                    }

                    // Traitement firstName
                    if (in_array('firstName', $keys)) {
                        $data['firstName'] = $this->profileSecurity->secureData($data['firstName']);
                        $contraints = $this->profileSecurity->firstNameContraints();
                        $invalid = $validator->validate(['firstName' => $data['firstName']], $contraints);
                        $violation = [];
                        foreach ($invalid as $err) {
                            $violation[] = $err->getMessage();
                        }
                        if (count($violation) > 0) {
                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                            return $this->json($errors, 400);
                        }
                        else {
                            if ($user->getFirstName() != $data['firstName']) {
                                $user->setFirstName($data['firstName']);
                                $return['change'][] = 'firstName';
                            }
                            else {
                                $return['identicalOld'][] = 'firstName';
                            }
                        }
                    }

                    // Traitement lastName
                    if (in_array('lastName', $keys)) {
                        $data['lastName'] = $this->profileSecurity->secureData($data['lastName']);
                        $contraints = $this->profileSecurity->lastNameContraints();
                        $invalid = $validator->validate(['lastName' => $data['lastName']], $contraints);
                        $violation = [];
                        foreach ($invalid as $err) {
                            $violation[] = $err->getMessage();
                        }
                        if (count($violation) > 0) {
                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                            return $this->json($errors, 400);
                        }
                        else {
                            if ($user->getLastName() != $data['lastName']) {
                                $user->setLastName($data['lastName']);
                                $return['change'][] = 'lastName';
                            }
                            else {
                                $return['identicalOld'][] = 'lastName';
                            }
                        }
                    }

                    // Traitement avatar
                    if (in_array('avatar', $keys)) {
                        $data['avatar'] = $this->profileSecurity->secureData($data['avatar']);
                        $contraints = $this->profileSecurity->avatarContraints();
                        $invalid = $validator->validate(['avatar' => $data['avatar']], $contraints);
                        $violation = [];
                        foreach ($invalid as $err) {
                            $violation[] = $err->getMessage();
                        }
                        if (count($violation) > 0) {
                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                            return $this->json($errors, 400);
                        }
                        else {
                            if ($user->getAvatar() != $data['avatar']) {
                                $user->setAvatar($data['avatar']);
                                $return['change'][] = 'avatar';
                            }
                            else {
                                $return['identicalOld'][] = 'avatar';
                            }
                        }
                    }

                    // Traitement birthDate
                    if (in_array('birthDate', $keys)) {
                        $data['birthDate'] = $this->profileSecurity->secureData($data['birthDate']);
                        $data['birthDate'] = DateTimeImmutable::createFromFormat('!Y-m-d', $data['birthDate']);
                        // return $this->json([$data['birthDate']], 400);
                        if ($data['birthDate']) {
                            $contraints = $this->profileSecurity->birthDateContraints();
                            $invalid = $validator->validate(['birthDate' => $data['birthDate']], $contraints);
                            $violation = [];
                            foreach ($invalid as $err) {
                                $violation[] = $err->getMessage();
                            }
                            if (count($violation) > 0) {
                                $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                                return $this->json([$violation, $data['birthDate']], 400);
                                
                            }
                            else {
                                if ($user->getBirthDate() != $data['birthDate']) {
                                    $user->setBirthDate($data['birthDate']);
                                    $return['change'][] = 'birthDate';
                                }
                                else {
                                    $return['identicalOld'][] = 'birthDate';
                                }
                            }
                        }
                        else {
                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                            return $this->json($errors, 400);
                        }
                        
                    }

                    // Traitement car
                    if (in_array('car', $keys)) {
                        if ($data['car'] && count($data['car']) > 0 && count($data['car']) < 7) {
                            $keysCar = array_keys($data['car']);
                            if (array_diff($keysCar, $keysCarAccept) == []) {
                                if ($user->getCar() != []) {
                                    $car = $entityManager->getRepository(Car::class)->findoneby(['owner' => $user->getId()]);

                                    // Traitement carPicture
                                    if (in_array('carPicture', $keysCar)) {
                                        $data['car']['carPicture'] = $this->profileSecurity->secureData($data['car']['carPicture']);
                                        $contraints = $this->profileSecurity->carPictureContraints();
                                        $invalid = $validator->validate(['carPicture' => $data['car']['carPicture']], $contraints);
                                        $violation = [];
                                        foreach ($invalid as $err) {
                                            $violation[] = $err->getMessage();
                                        }
                                        if (count($violation) > 0) {
                                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                                            return $this->json($errors, 400);
                                        }
                                        else {
                                            if ($car->getCarPicture() != $data['car']['carPicture']) {
                                                $car->setCarPicture($data['car']['carPicture']);
                                                $return['changeCar'][] = 'carPicture';
                                            }
                                            else {
                                                $return['identicalOldCar'][] = 'carPicture';
                                            }
                                        }
                                    }

                                    // Traitement color
                                    if (in_array('color', $keysCar)) {
                                        $data['car']['color'] = $this->profileSecurity->secureData($data['car']['color']);
                                        $contraints = $this->profileSecurity->colorContraints();
                                        $invalid = $validator->validate(['color' => $data['car']['color']], $contraints);
                                        $violation = [];
                                        foreach ($invalid as $err) {
                                            $violation[] = $err->getMessage();
                                        }
                                        if (count($violation) > 0) {
                                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                                            return $this->json($errors, 400);
                                        }
                                        else {
                                            if ($car->getColor() != $data['car']['color']) {
                                                $car->setColor($data['car']['color']);
                                                $return['changeCar'][] = 'color';
                                            }
                                            else {
                                                $return['identicalOldCar'][] = 'color';
                                            }
                                        }
                                    }

                                    // Traitement places
                                    if (in_array('places', $keysCar)) {
                                        $data['car']['places'] = $this->profileSecurity->secureData($data['car']['places']);
                                        $contraints = $this->profileSecurity->placesContraints();
                                        $invalid = $validator->validate(['places' => $data['car']['places']], $contraints);
                                        $violation = [];
                                        foreach ($invalid as $err) {
                                            $violation[] = $err->getMessage();
                                        }
                                        if (count($violation) > 0) {
                                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                                            return $this->json($errors, 400);
                                        }
                                        else {
                                            if ($car->getPlaces() != $data['car']['places']) {
                                                $car->setPlaces($data['car']['places']);
                                                $return['changeCar'][] = 'places';
                                            }
                                            else {
                                                $return['identicalOldCar'][] = 'places';
                                            }
                                        }
                                    }

                                    // Traitement smallBaggage
                                    if (in_array('smallBaggage', $keysCar)) {
                                        $data['car']['smallBaggage'] = $this->profileSecurity->secureData($data['car']['smallBaggage']);
                                        $contraints = $this->profileSecurity->smallBaggageContraints();
                                        $invalid = $validator->validate(['smallBaggage' => $data['car']['smallBaggage']], $contraints);
                                        $violation = [];
                                        foreach ($invalid as $err) {
                                            $violation[] = $err->getMessage();
                                        }
                                        if (count($violation) > 0) {
                                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                                            return $this->json($errors, 400);
                                        }
                                        else {
                                            if ($car->getSmallBaggage() != $data['car']['smallBaggage']) {
                                                $car->setSmallBaggage($data['car']['smallBaggage']);
                                                $return['changeCar'][] = 'smallBaggage';
                                            }
                                            else {
                                                $return['identicalOldCar'][] = 'smallBaggage';
                                            }
                                        }
                                    }

                                    // Traitement largeBaggage
                                    if (in_array('largeBaggage', $keysCar)) {
                                        $data['car']['largeBaggage'] = $this->profileSecurity->secureData($data['car']['largeBaggage']);
                                        $contraints = $this->profileSecurity->largeBaggageContraints();
                                        $invalid = $validator->validate(['largeBaggage' => $data['car']['largeBaggage']], $contraints);
                                        $violation = [];
                                        foreach ($invalid as $err) {
                                            $violation[] = $err->getMessage();
                                        }
                                        if (count($violation) > 0) {
                                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                                            return $this->json($errors, 400);
                                        }
                                        else {
                                            if ($car->getLargeBaggage() != $data['car']['largeBaggage']) {
                                                $car->setLargeBaggage($data['car']['largeBaggage']);
                                                $return['changeCar'][] = 'largeBaggage';
                                            }
                                            else {
                                                $return['identicalOldCar'][] = 'largeBaggage';
                                            }
                                        }
                                    }

                                    // Traitement model
                                    if (in_array('model', $keysCar)) {
                                        $data['car']['model'] = $this->profileSecurity->secureData($data['car']['model']);
                                        $contraints = $this->profileSecurity->modelContraints();
                                        $invalid = $validator->validate(['model' => $data['car']['model']], $contraints);
                                        $violation = [];
                                        foreach ($invalid as $err) {
                                            $violation[] = $err->getMessage();
                                        }
                                        if (count($violation) > 0) {
                                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                                            return $this->json($errors, 400);
                                        }
                                        else {
                                            if (in_array('brand', $keysCar)) {
                                                $data['car']['brand'] = $this->profileSecurity->secureData($data['car']['brand']);
                                                $contraints = $this->profileSecurity->modelContraints();
                                                $invalid = $validator->validate(['model' => $data['car']['model']], $contraints);
                                                $violation = [];
                                                foreach ($invalid as $err) {
                                                    $violation[] = $err->getMessage();
                                                }
                                                if (count($violation) > 0) {
                                                    $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                                                    return $this->json($errors, 400);
                                                }
                                                else {
                                                    if ($car->getModel()->getName() != $data['car']['model'] 
                                                    || $car->getModel()->getBrand()->getName() != $data['car']['brand']) {



                                                        $car->setLargeBaggage($data['car']['largeBaggage']);
                                                        $return['changeCar'][] = 'largeBaggage';
                                                    }
                                                    else {
                                                        $return['identicalOldCar'][] = 'model';
                                                    }



                                                }
                                            }
                                            else {





                                            }




                                            if ($car->getLargeBaggage() != $data['car']['largeBaggage']) {
                                                $car->setLargeBaggage($data['car']['largeBaggage']);
                                                $return['changeCar'][] = 'largeBaggage';
                                            }
                                            else {
                                                $return['identicalOldCar'][] = 'largeBaggage';
                                            }
                                        }



                                        

                                    }


                                    if (in_array('brand', $keysCar)) {
                                        $data['car']['brand'] = $this->profileSecurity->secureData($data['car']['brand']);
                                        // @todo brand
                                        // contraintes : not blank
                                        // existe dans tables brand (si non message erreur)
                                    }

                                    // Traitement model
                                    if (in_array('model', $keysCar)) {
                                        $data['car']['model'] = $this->profileSecurity->secureData($data['car']['model']);
                                        // @todo model
                                    }








                                }
                                else {
                                    // @todo $user->getCar() == []
                                    // creer car
                                }


                                
                                

                                
                                

                                

                                
                            }
                            else {
                                $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
                                return $this->json($errors, 400);
                            }
                        }
                        else {
                            $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
                            return $this->json($errors, 400);
                        }
                    }

                    // Traitement options
                    if (in_array('options', $keys)) {
                        if ($data['options'] && count($data['options']) > 0 && count($data['options']) < 5) {
                            $keysOptions = array_keys($data['options']);
                            if (array_diff($keysOptions, $keysOptionsAccept) == []) {
                                if ($user->getOptions() != []) {
                                    $options = $entityManager->getRepository(Option::class)->findoneby(['owner' => $user->getId()]);

                                    // Traitement silence
                                    if (in_array('silence', $keysOptions)) {
                                        $data['options']['silence'] = $this->profileSecurity->secureData($data['options']['silence']);
                                        $contraints = $this->profileSecurity->booleanContraints();
                                        $invalid = $validator->validate(['booleanCheck' => $data['options']['silence']], $contraints);
                                        $violation = [];
                                        foreach ($invalid as $err) {
                                            $violation[] = $err->getMessage();
                                        }
                                        if (count($violation) > 0) {
                                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                                            return $this->json($errors, 400);
                                        }
                                        else {
                                            if ($options->isSilence() != $data['options']['silence']) {
                                                $options->setSilence($data['options']['silence']);
                                                $return['changeOptions'][] = 'silence';
                                            }
                                            else {
                                                $return['identicalOldOptions'][] = 'silence';
                                            }
                                        }
                                    }

                                    // Traitement smoke
                                    if (in_array('smoke', $keysOptions)) {
                                        $data['options']['smoke'] = $this->profileSecurity->secureData($data['options']['smoke']);
                                        $contraints = $this->profileSecurity->booleanContraints();
                                        $invalid = $validator->validate(['booleanCheck' => $data['options']['smoke']], $contraints);
                                        $violation = [];
                                        foreach ($invalid as $err) {
                                            $violation[] = $err->getMessage();
                                        }
                                        if (count($violation) > 0) {
                                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                                            return $this->json($errors, 400);
                                        }
                                        else {
                                            if ($options->isSmoke() != $data['options']['smoke']) {
                                                $options->setSmoke($data['options']['smoke']);
                                                $return['changeOptions'][] = 'smoke';
                                            }
                                            else {
                                                $return['identicalOldOptions'][] = 'smoke';
                                            }
                                        }
                                    }

                                    // Traitement animals
                                    if (in_array('animals', $keysOptions)) {
                                        $data['options']['animals'] = $this->profileSecurity->secureData($data['options']['animals']);
                                        $contraints = $this->profileSecurity->booleanContraints();
                                        $invalid = $validator->validate(['booleanCheck' => $data['options']['animals']], $contraints);
                                        $violation = [];
                                        foreach ($invalid as $err) {
                                            $violation[] = $err->getMessage();
                                        }
                                        if (count($violation) > 0) {
                                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                                            return $this->json($errors, 400);
                                        }
                                        else {
                                            if ($options->isAnimals() != $data['options']['animals']) {
                                                $options->setAnimals($data['options']['animals']);
                                                $return['changeOptions'][] = 'animals';
                                            }
                                            else {
                                                $return['identicalOldOptions'][] = 'animals';
                                            }
                                        }
                                    }

                                    //Traitement music
                                    if (in_array('music', $keysOptions)) {
                                        $data['options']['music'] = $this->profileSecurity->secureData($data['options']['music']);
                                        $contraints = $this->profileSecurity->booleanContraints();
                                        $invalid = $validator->validate(['booleanCheck' => $data['options']['music']], $contraints);
                                        $violation = [];
                                        foreach ($invalid as $err) {
                                            $violation[] = $err->getMessage();
                                        }
                                        if (count($violation) > 0) {
                                            $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                                            return $this->json($errors, 400);
                                        }
                                        else {
                                            if ($options->isMusic() != $data['options']['music']) {
                                                $options->setMusic($data['options']['music']);
                                                $return['changeOptions'][] = 'music';
                                                if ($options->isMusic()) {
                                                    if (in_array('musicOption', $keysOptions)) {
                                                        // @todo
                                                        // validation array
                                                        // valid each alpha
                                                        // for each key : creer music []

                                                        // $music = new Music;
                                                        // $music->setGenre();
                                                    }
                                                }
                                                else {
                                                    // @todo
                                                    // for each key : effacer music []

                                                }
                                            }
                                            else {
                                                $return['identicalOldOptions'][] = 'music';
                                                if ($options->isMusic()) {

                                                }
                                                else {
        
                                                }
                                            }
                                        }

                                        // if ($options->isMusic()) {

                                        // }
                                        // else {

                                        // }
                                        // @todo musicOption
                                        // si music = true
                                    }
                                }
                                else {
                                    // @todo $user->getOptions() == []
                                }



                                

                                

                                

                                
                            }
                            else {
                                $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
                                return $this->json($errors, 400);
                            }
                        }
                        else {
                            $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
                            return $this->json($errors, 400);
                        }
                    }




                    $entityManager->flush();
                    return $this->json($return, 200);

                }
                else {
                    $errors["userErr"] = "L'utilisateur n'existe pas !";
                    return $this->json($errors, 400);
                }






            }
            else {
                $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
                return $this->json($errors, 400);
            }
        }
        else {
            $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
            return $this->json($errors, 400);
        }

    }


    /**
     * Function profileUpdatePassword
     * 
     * Description :
     * Permet le changement du mot de passe de l'utilisateur connecté
     * L'email de l'utilisateur est stocké dans le token
     * L'ancien et le nouveau mot de passe sont contenus le JSON
     * Retourne un JSON informant de la réussite ou non de la requête
     * 
     * Requête :
     *  Méthode : PATCH
     *  Route : /hr/profile/update/password
     * 
     * 
     * Exemple JSON attendu :
     * {
     *  "old": "Az-1qswx",
     *  "new": "Secret1!"
     * }
     * 
     * "old" contient l'ancien mot de passe
     * "new" contient le nouveau mot de passe
     * 
     * 
     * * JSON envoyé en cas d'erreur sur le format des données envoyées (Code HTTP : 400) :
     * {"jsonErr": "Le format des données envoyées n'est pas correct !"}
     * 
     * 
     * JSON envoyé en cas de données non valides envoyées (Code HTTP : 400) :
     * {"validErr": "Un ou plusieurs champs ne sont pas valides"}
     * 
     * 
     * JSON envoyé en cas d'ancien mot de passe non valide envoyé :
     * {"oldErr": "Le mot de passe n'est pas valide !"}
     * 
     * 
     * JSON envoyé en cas de succès de la requete :
     * {"passwordChange": "Votre mot de passe est bien modifié !"}
     * 
     * 
     * Liste JSON envoyé en cas d'erreur sur le token (Code HTTP : 401) :
     * Identification incorrecte : {"code": 401, "message": "Invalid credentials."}
     * Session a expirée : {"code":401,"message":"Expired JWT Token"}
     * Token non valide : {"code":401,"message":"Invalid JWT Token"}
     * Token absent : {"code":401,"message":"JWT Token not found"}
     * 
     * 
     * Remarque : 
     * Le test pour savoir si l'utilisateur existe est inutile car déjà géré avec le token
     * Le JSON {"userErr": "L'utilisateur n'existe pas !"}, Code HTTP : 400) n'est donc jamais envoyé
     * 
     */
    #[Route('/hr/profile/update/password', name: 'app_profil_update_password', methods: ['PATCH'])]
    public function profileUpdatepassword(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator, UserPasswordHasherInterface $userPasswordHasher): jsonResponse
    {
        $decodedJwtToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $email = $decodedJwtToken['username'];

        $jsonData = $request->getContent();
        $data = json_decode($jsonData, true);
        if ($data && count($data) == 2) {
            $keys = array_keys($data);
            if (array_diff($keys, ["old", "new"]) == []) {
                foreach ($keys as $key) {
                    $data[$key] = $this->profileSecurity->secureData($data[$key]);
                }
                $contraints = $this->profileSecurity->passwordContraints();
                $invalid = $validator->validate($data, $contraints);
                $violation = [];
                foreach ($invalid as $err) {
                    $violation[] = $err->getMessage();
                }
                if (count($violation) > 0) {
                    $errors["validErr"] = "Un ou plusieurs champs ne sont pas valides";
                    return $this->json($errors, 400);
                }

                $user = $entityManager->getRepository(User::class)->findoneby(['email' => $email]);
                if ($user) {
                    if ($userPasswordHasher->isPasswordValid($user, $data['old'])) {
                        $user->setPassword($userPasswordHasher->hashPassword($user, $data['new']));
                        $entityManager->flush();
                        return $this->json(["passwordChange" => "Votre mot de passe est bien modifié !"], 200);
                    }
                    else {
                        $errors["oldErr"] = "Le mot de passe n'est pas valide !";
                        return $this->json($errors, 400);
                    }
                }
                else {
                    $errors["userErr"] = "L'utilisateur n'existe pas !";
                    return $this->json($errors, 400);
                }
            } else {
                $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
                return $this->json($errors, 400);
            }
        }
        else {
            $errors["jsonErr"] = "Le format des données envoyées n'est pas correct !";
            return $this->json($errors, 400);
        }

    }

}
