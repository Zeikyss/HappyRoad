<?php

namespace App\Controller;

use App\Entity\Contact;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class ContactController extends AbstractController
{
    #[Route('/mail', name: 'app_contact')]
    public function sendMail(Request $request, MailerInterface $mailer): Response
    {  
        $erreur=[];
        $regexText= "/^(?!.*?[\s]{2,})(?=.*?[\w\-\sç'àâäéèêëîïôöûüùÿ?,;:!()'\"^])[\w\-\sç'àâäéèêëîïôöûüùÿ?,;:!()'\"^]{5,200}$/";
        $regexMsg= "/^(?!.*?[\s]{2,})(?=.*?[\w\-\sç'àâäéèêëîïôöûüùÿ?,;:!()'\"^])[\w\-\sç'àâäéèêëîïôöûüùÿ?,;:!()'\"^]{5,500}$/";

        // fonction qui bloque les erreurs faite non par l'utilisateur/bloque la synthaxe de codage
        function cleanData(string $data):string{
            $data = trim($data);
            $data = stripslashes($data);
            return htmlspecialchars($data);
        };
        //    recupération du serveur
        $jsonData= $request->getContent();
        $jsonObject= json_decode($jsonData);
        //vérification du mail et qu'il est bien un mail
        $email = $jsonObject->{'email'};
        if(empty($email)){
            $erreur["email"] ="Veuillez saisir un email";
        }else{
        $email = cleanData($email);
        if(strlen($email)<6 || strlen($email)>180){
            $erreur["email"] = 'Votre email n a pas une taille adapté';
            };
        }
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $erreur["email"]= 'Veuilliez saisir un mail valide';
        }
        var_dump($erreur);

        //vérification de de l'objet
        $subject = $jsonObject->{'subject'};
        if(empty($subject)){
            $erreur["subject"]='Veuilliez saisir votre oject';
        }else{
            $subject= cleanData($subject);
            if(strlen($subject)<5 || strlen($subject)>200){
                $erreur["subject"] = "Votre subject n a pas une taille adapté";
        };
        if(!preg_match($regexText, $subject)){
            $erreur["subject"] = "Votre sujet ne doit pas comporter de caractères spéciaux !";
        }
        }
        var_dump($erreur);
        //Vérification du message
        $message = $jsonObject->{'message'};
        if(empty($message)){
            $erreur["message"]='Veuilliez saisir votre message';
        }else{
            $message= cleanData($message);
            if(strlen($message)<5 || strlen($message)>500){
                $erreur["message"] = 'Votre message n a pas une taille adapté';
        };
        if(!preg_match($regexMsg, $subject)){
            $erreur["message"] = "Votre message ne doit pas comporter de caractères spéciaux !";
        }
        var_dump($erreur);
        }
        // s'il y a pas d'erreur on envoi le mail
        var_dump(empty($erreur));
        if(!empty($erreur)){
            $erreur["email"] = 'Votre message n a pas été envoyé';
            return new Response('votre message n a pas été envoyé');
        } else{
            //on crée un nouveau email de contact 
       $email = (new Email())
       ->from($email)
       ->to('contact@happyroad.com')
       ->subject($subject)
       ->html($message);

        // envoi du mail de contact
        $mailer->send($email);

        return new Response('Votre email est envoyé');
        }
    
    }
}