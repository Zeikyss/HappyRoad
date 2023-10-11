<?php

namespace App\Security;

use phpDocumentor\Reflection\Types\Integer;
use Symfony\Component\Validator\Constraints as Assert;

class ProfileSecurity extends Security
{
    /**
     * Function passwordContraints
     * Contraintes de validation pour la modification du mot de passe de l'utilisateur
     * Entité : user, Champ : password
     * Clé old : ancien mot de passe
     * Clé new : nouveau mot de passe
     */
    public function passwordContraints()
    {
        $contraints = new Assert\Collection([
            'old' => [
                new Assert\NotBlank(message: "Vous devez saisir un mot de passe !"),
            ],
            'new' => [
                new Assert\NotBlank(message: "Vous devez saisir un mot de passe !"),
                new Assert\Length(
                    min: 8,
                    max: 20,
                    minMessage: "Le mot de passe doit comporter au minimum 8 caractères !",
                    maxMessage: "Le mot de passe ne doit pas comporter plus de 20 caractères !"
                ),
                new Assert\Regex(
                    pattern: "/[A-Z]/",
                    message: "Vous devez respecter le format du mot de passe !"
                ),
                new Assert\Regex(
                    pattern: "/[a-z]/",
                    message: "Vous devez respecter le format du mot de passe !"
                ),
                new Assert\Regex(
                    pattern: "/[\d]/",
                    message: "Vous devez respecter le format du mot de passe !"
                ),
                new Assert\Regex(
                    pattern: "/[ç&#@%\$€µ£=*\-+\/%_?.,;:!\"'<>^(){}[\]|°§¤]/",
                    message: "Vous devez respecter le format du mot de passe !"
                ),
                new Assert\Regex(
                    pattern: "/[^\wç&#@%\$€µ£=*\-+\/%_?.,;:!\"'<>^(){}[\]|°§¤]/",
                    match: false,
                    message: "Vous devez respecter le format du mot de passe !"
                ),
            ],
        ]);

        return $contraints;

    }


    /**
     * Function emailContraints
     * Contraintes de validation pour la modification de l'email de l'utilisateur
     * Entité : user, Champ : email
     */
    public function emailContraints()
    {
        $contraints = new Assert\Collection([
            'email' => [
                new Assert\NotBlank(message: "Vous devez saisir un email !"),
                new Assert\Email(message: "Vous devez saisir un email valide !"),
                new Assert\Length(
                    min: 6,
                    max: 180,
                    minMessage: "Votre email doit comporter au minimum 6 caractères !",
                    maxMessage: "Votre email ne doit pas comporter plus de 180 caractères !"
                ),
            ],
        ]);

        return $contraints;

    }


    /**
     * Function pseudoContraints
     * Contraintes de validation pour la modification du pseudo de l'utilisateur
     * Entité : user, Champ : pseudo
     */
    public function pseudoContraints()
    {
        $contraints = new Assert\Collection([
            'pseudo' => [
                new Assert\NotBlank(message: "Vous devez saisir un nom d'utilisateur !"),
                new Assert\Length(
                    min: 3,
                    max: 25,
                    minMessage: "Le nom d'utilisateur doit comporter au minimum 3 caractères !",
                    maxMessage: "Le nom d'utilisateur ne doit pas comporter plus de 25 caractères !"
                ),
                new Assert\Regex(
                    pattern: "/^[\s]/",
                    match: false,
                    message: "Votre nom d'utilisateur ne doit pas commencer par un espace' !"
                ),
                new Assert\Regex(
                    pattern: "/[\s]{2,}/",
                    match: false,
                    message: "Votre nom d'utilisateur ne doit pas comporter plusieurs espaces à la suite !"
                ),
                new Assert\Regex(
                    pattern: "/[\s]$/",
                    match: false,
                    message: "Votre nom d'utilisateur ne doit pas finir par un espace !"
                ),
            ],
        ]);

        return $contraints;

    }


    /**
     * Function firstNameContraints
     * Contraintes de validation pour la modification du prénom de l'utilisateur
     * Entité : user, Champ : firstName
     */
    public function firstNameContraints()
    {
        $contraints = new Assert\Collection([
            'firstName' => [
                new Assert\NotBlank(message: "Vous devez saisir votre prénom !"),
                new Assert\Length(
                    min: 1,
                    max: 50,
                    minMessage: "Votre prénom doit comporter au minimum 1 caractère !",
                    maxMessage: "Votre prénom ne doit pas comporter plus de 50 caractères !"
                ),
                new Assert\Regex(
                    pattern: "/^[\-\s]/",
                    match: false,
                    message: "Votre prénom ne doit pas commencer par ' ' ou '-' !"
                ),
                new Assert\Regex(
                    pattern: "/[A-Za-z\-\sàâäéèêëîïôöûüÿ]/",
                    message: "Votre prénom doit être valide !"
                ),
                new Assert\Regex(
                    pattern: "/[^A-Za-z\-\sàâäéèêëîïôöûüÿ]/",
                    match: false,
                    message: "Votre prénom ne doit pas comporter de caractères spéciaux !"
                ),
                new Assert\Regex(
                    pattern: "/[\s|-]{2,}/",
                    match: false,
                    message: "Votre prénom doit être valide !"
                ),
                new Assert\Regex(
                    pattern: "/[\-\s]$/",
                    match: false,
                    message: "Votre prénom ne doit pas finir par ' ' ou '-' !"
                ),
            ],
        ]);

        return $contraints;

    }


    /**
     * Function lastNameContraints
     * Contraintes de validation pour la modification du nom de l'utilisateur
     * Entité : user, Champ : lestName
     */
    public function lastNameContraints()
    {
        $contraints = new Assert\Collection([
            'lastName' => [
                new Assert\NotBlank(message: "Vous devez saisir votre nom !"),
                new Assert\Length(
                    min: 1,
                    max: 50,
                    minMessage: "Votre nom doit comporter au minimum 1 caractère !",
                    maxMessage: "Votre nom ne doit pas comporter plus de 50 caractères !"
                ),
                new Assert\Regex(
                    pattern: "/^[\-\s]/",
                    match: false,
                    message: "Votre prénom ne doit pas commencer par ' ' ou '-' !"
                ),
                new Assert\Regex(
                    pattern: "/[A-Za-z\-\sàâäéèêëîïôöûüÿ]/",
                    message: "Votre nom doit être valide !"
                ),
                new Assert\Regex(
                    pattern: "/[^A-Za-z\-\sàâäéèêëîïôöûüÿ]/",
                    match: false,
                    message: "Votre nom ne doit pas comporter de caractères spéciaux !"
                ),
                new Assert\Regex(
                    pattern: "/[\s|-]{2,}/",
                    match: false,
                    message: "Votre nom doit être valide !"
                ),
                new Assert\Regex(
                    pattern: "/[\-\s]$/",
                    match: false,
                    message: "Votre nom ne doit pas finir par ' ' ou '-' !"
                ),
            ],
        ]);

        return $contraints;

    }


    /**
     * Function avatarContraints
     * Contraintes de validation pour la modification du nom du fichier de l'image de l'avatar de l'utilisateur
     * Entité : user, Champ : avatar
     */
    public function avatarContraints()
    {
        $contraints = new Assert\Collection([
            'avatar' => [
                new Assert\NotBlank(message: "Le nom du fichier ne peut pas être vide !"),
                new Assert\Regex(
                    pattern: "/^avatar_/",
                    message: "Le préfixe du fichier avatar doit commencer par avatar_ !"
                ),
                new Assert\Regex(
                    pattern: "/(\.jpg|\.jpeg|\.png)$/",
                    message: "Les extensions autorisées pour le fichier avatar sont .jpg, .jpeg, .png !"
                ),
                new Assert\Regex(
                    pattern: "/^[^.]*\.[^.]*$/",
                    message: "Le nom du fichier avatar doit contenir un seul point (.) !"
                ),
                new Assert\Regex(
                    pattern: "/^[^_]*_[^_]*$/",
                    message: "Le nom du fichier avatar ne doit contenir un seul underscore (_) !"
                ),
            ],
        ]);

        return $contraints;

    }


    /**
     * Function birthDateContraints
     * Contraintes de validation pour la modification de la date de naissance de l'utilisateur
     * Entité : user, Champ : birthDate
     */
    public function birthDateContraints()
    {
        $contraints = new Assert\Collection([
            'birthDate' => [
                new Assert\LessThan('-18 years', message: "Vous devez avoir au moins 18 ans !"),
                new Assert\GreaterThan('-120 years', message: "Vous devez entrer une date de naissance valide !"),
            ],
        ]);

        return $contraints;

    }


    /**
     * Function carPictureContraints
     * Contraintes de validation pour la modification du nom de fichier de l'image de la voiture de l'utilisateur
     * Entité : car, Champ : carPicture
     */
    public function carPictureContraints()
    {
        $contraints = new Assert\Collection([
            'carPicture' => [
                new Assert\NotBlank(message: "Le nom du fichier ne peut pas être vide !"),
                new Assert\Regex(
                    pattern: "/^avatar_/",
                    message: "Le préfixe du fichier avatar doit commencer par car_ !"
                ),
                new Assert\Regex(
                    pattern: "/(\.jpg|\.jpeg|\.png)$/",
                    message: "Les extensions autorisées pour le fichier avatar sont .jpg, .jpeg, .png !"
                ),
                new Assert\Regex(
                    pattern: "/^[^.]*\.[^.]*$/",
                    message: "Le nom du fichier avatar doit contenir un seul point (.) !"
                ),
                new Assert\Regex(
                    pattern: "/^[^_]*_[^_]*$/",
                    message: "Le nom du fichier avatar ne doit contenir un seul underscore (_) !"
                ),
            ],
        ]);

        return $contraints;

    }


    /**
     * Function colorContraints
     * Contraintes de validation pour la modification da la couleur de la voiture de l'utilisateur
     * Entité : car, Champ : color
     */
    public function colorContraints()
    {
        $contraints = new Assert\Collection([
            'color' => [
                new Assert\NotBlank(message: "La couleur ne peut pas être vide !"),
                new Assert\Type(type: 'alpha', message: 'La couleur doit être valide !'),
            ],
        ]);

        return $contraints;

    }


    
    /**
     * Function placesContraints
     * Contraintes de validation pour la modification du nombres de places dans la voiture de l'utilisateur
     * Entité : car, Champ : places
     */
    public function placesContraints()
    {
        $contraints = new Assert\Collection([
            'places' => [
                new Assert\Type(type: 'integer', message: 'Le nombre de places doit être entier'),
                new Assert\Positive(message: "Le nombre de places minimum est 1 !"),
                new Assert\LessThan('9', message: "Le nombre de places maximum est 8 !"),
            ],
        ]);

        return $contraints;

    }


    /**
     * Function smallBaggageContraints
     * Contraintes de validation pour la modification du nombre de petits bagages autorisés dans la voiture de l'utilisateur
     * Entité : car, Champ : smallBaggage
     */
    public function smallBaggageContraints()
    {
        $contraints = new Assert\Collection([
            'smallBaggage' => [
                new Assert\Type(type: 'integer', message: 'Le nombre de petits bagages doit être entier'),
                new Assert\PositiveOrZero(message: "Le nombre de petits bagages doit être positif !"),
                new Assert\LessThan('9', message: "Le nombre de petits bagages maximum est 8 !"),
            ],
        ]);

        return $contraints;

    }


    /**
     * Function largeBaggageContraints
     * Contraintes de validation pour la modification du nombre de grands bagages autorisés dans la voiture de l'utilisateur
     * Entité : car, Champ : largeBaggage
     */
    public function largeBaggageContraints()
    {
        $contraints = new Assert\Collection([
            'largeBaggage' => [
                new Assert\Type(type: 'integer', message: 'Le nombre de grands bagages doit être entier'),
                new Assert\PositiveOrZero(message: "Le nombre de grands bagages doit être positif !"),
                new Assert\LessThan('9', message: "Le nombre de grands bagages maximum est 8 !"),
            ],
        ]);

        return $contraints;

    }


    /**
     * Function modelContraints
     * Contraintes de validation pour la modification du modèle de la voiture de l'utilisateur
     * Entité : model, Champ : name
     */
    public function modelContraints()
    {
        $contraints = new Assert\Collection([
            'model' => [
                new Assert\NotBlank(message: "Le modèle ne peut pas être vide !"),             
            ],
        ]);

        return $contraints;

    }


    /**
     * Function brandContraints
     * Contraintes de validation pour la modification de la marque de la voiture de l'utilisateur
     * Entité : brand, Champ : name
     */
    public function brandContraints()
    {
        $contraints = new Assert\Collection([
            'brand' => [
                new Assert\NotBlank(message: "La marque ne peut pas être vide !"),             
            ],
        ]);

        return $contraints;

    }



    // @todo options





}
