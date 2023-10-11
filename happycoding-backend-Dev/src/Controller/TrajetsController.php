<?php

namespace App\Controller;

use App\Entity\Traject;
use App\Entity\Address;
use Symfony\Component\Routing\Route;
use App\Repository\AdressesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TrajetsController extends AbstractController
{
  public function __construct(private readonly EntityManagerInterface $em)
  {
  }

  #[Route('/hr/adresses/readHome', name: 'App_trajets', methods: ['GET'])]
  public function readTrajets(Address $idTrajet, $ville, $type, $em)
  {
    $idTrajet = $this->em->getidTrajet->findAll(['adresses' => $idTrajet]);

    //  $trajet = $this->em->getRepository(Adresses::class);
    // if($trajet === null){
    //   return new JsonResponse(null);
    // }
    //$Trajet = $this->getDoctrin()->getRepository(Adresses::class)->findBy(['type'=>$type]);
    //     $em = $this->getDoctrine()->getManager();
    //    $Départ = $em->getRepository(Adresses::class)->findByTypeAndIdTrajet(array('types'=>'départ','arriver'), array('idTrajet' => 'DESC'));
    //   $trajets= $em->getRepository(Adresses::class)->findAll();
    //  $datas = array($Départ);

    return new JsonResponse($idTrajet);
  }
}
