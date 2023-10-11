<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class ApiLoginController extends AbstractController
{   
    #[Route('/auth', name: 'api_login')]
    public function login(AuthenticationUtils $authenticationUtils): JsonResponse
    {
        if ($this->getUser()) {
            // return $this->redirectToRoute('account');
            return new JsonResponse('Erreur ddff  1');
        }
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();
    
        return new Response('erreur, non connecté');
        // $this->render('', ['last_username' => $lastUsername, 'error' => $error]);
    }
    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}