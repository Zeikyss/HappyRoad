<?php

namespace App\Security;

use Symfony\Component\Validator\Constraints as Assert;

class Security
{
    /**
     * Function secureData
     * securise une chaine de caracteres :
     * supprime les caracteres invisibles (espace, \t, \n, \r, \0 et \v) en début et fin
     * supprime les antislahs
     * convertit les caracteres spéciaux en entites html
     */
    public function secureData(string $data) : string
    {
        return trim(stripslashes(htmlspecialchars($data)));
    }


    /**
     * Function booleanContraints
     * Contraintes de validation pour un booléen
     */
    public function booleanContraints()
    {
        $contraints = new Assert\Collection([
            'blooleanCheck' => [
                new Assert\Type(type: 'boolean', message: 'Le champ doit être un booléen !'),
            ],
        ]);

        return $contraints;

    }

}
