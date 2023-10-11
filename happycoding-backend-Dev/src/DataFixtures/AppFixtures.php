<?php

namespace App\DataFixtures;

use App\Entity\Address;
use App\Entity\User;
use App\Entity\Traject;
use App\Entity\Comment;
use App\Entity\Favorite;
use App\Entity\Music;
use App\Entity\Option;
use App\Entity\Reservation;
use App\Entity\Car;
use App\Entity\TypeAddress;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Faker;
use DateTimeImmutable;
use DateTime;
use Doctrine\ORM\Mapping\Id;

use App\Repository\TypeAddressRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;



class AppFixtures extends Fixture
{
    // public function __construct(private UserPasswordHasherInterface $passwordEncoder, private EntityManagerInterface $entityManager)
    public function __construct(private UserPasswordHasherInterface $passwordEncoder)
    {
        // $this->entityManager = $entityManager;
    }

    public function load(ObjectManager $manager): void
    {

        $faker = Faker\Factory::create('fr_FR');

        // $typeAdr1 = $this->entityManager->getRepository(TypeAddress::class)->findOneById(1);
        // $typeAdr2 = $this->entityManager->getRepository(TypeAddress::class)->findOneById(2);

        // $typeAdresseRepository = $manager->getRepository(TypeAddress::class);
        // $typeAdr1 = $typeAdresseRepository->findOneBy(array('id' => 1));
        // $typeAdr2 = $typeAdresseRepository->findOneBy(array('id' => 2));

        // $adr = new TypeAddress;
        // $entity = new ManagerRegistry;
        // $typeAdresseRepository = new TypeAddressRepository($entity);

        // $type1 = $typeAdresseRepository->find(1);
        // $type1=$entityManager->getRepository(TypeAddress::class)->find(1);
        // $type2=$entityManager->getRepository(TypeAddress::class)->find(2);

        //table User

        for ($usr = 1; $usr <= 10; $usr++) {
            $user = new User();
            $user->setEmail($faker->email());
            $user->setRoles(['ROLE_USER']);
            $user->setPassword(
                $this->passwordEncoder->hashPassword($user, 'Secret1!')
            );
            $user->setPseudo($faker->userName());
            $user->setFirstName($faker->firstName());
            $user->setLastName($faker->lastName());
            $user->setCreatedAt(new dateTimeImmutable());
            $user->setLastActivity(new dateTimeImmutable());
            $user->setAvatar($faker->image());
            $user->setBirthDate(new DateTimeImmutable());
            $user->setIsVerified($faker->boolean());
            $user->setTotalCredits(random_int(0, 100));
            $user->setReport($faker->boolean());


            $manager->persist($user);
        }

        //table Trajets

        for ($trj = 1; $trj <= 5; $trj++) {
            $traject = new Traject();

            $traject->setOwner($user);
            $traject->setPassengers($faker->shuffleArray());
            $traject->setPlaces($faker->numberBetween(1, 8));
            $traject->setPrice($faker->numberBetween(1, 200));
            $traject->setSmallBaggage($faker->numberBetween(0, 5));
            $traject->setLargeBaggage($faker->numberBetween(0, 5));
            $traject->setStartTime(new dateTimeImmutable());
            $traject->setCreatedAt(new dateTimeImmutable());
            $traject->setUpdatedAt(new dateTimeImmutable());

            $manager->persist($traject);
        }

        //table Adresses

        for ($adr = 1; $adr <= 5; $adr++) {
            $address = new Address();
            $address->setAddress($faker->streetAddress());
            $address->setComplement($faker->shuffleString());
            $address->setZipCode(str_replace(' ', '', $faker->postcode()));
            $address->setCity($faker->city());
            // $address->setType($typeadr1);
            $manager->persist($address);

            $address = new Address();
            $address->setAddress($faker->streetAddress());
            $address->setComplement($faker->shuffleString());
            $address->setZipCode(str_replace(' ', '', $faker->postcode()));
            $address->setCity($faker->city());
            // $address->setType($typeadr2);
            $manager->persist($address);
        }

        //table Avis

        for ($com = 1; $com <= 5; $com++) {
            $comment = new Comment();

            $comment->setOwner($user);
            $comment->setComment($faker->paragraphs(3, true));
            $comment->setScore($faker->numberBetween(1, 5));
            $comment->setCreatedAt(new dateTimeImmutable());
            $comment->setReport($faker->boolean());

            $manager->persist($comment);
        }

        //table Favoris

        for ($fav = 1; $fav <= 3; $fav++) {
            $favorite = new Favorite();

            $favorite->setOwner($user);
            $favorite->setUserId($faker->shuffleArray());

            $manager->persist($favorite);
        }


        //table Options

        for ($opt = 1; $opt <= 5; $opt++) {
            $option = new Option();

            $option->setOwner($user);
            $option->setSilence($faker->boolean());
            $option->setSmoke($faker->boolean());
            $option->setAnimals($faker->boolean());
            $option->setMusic($faker->boolean());

            $manager->persist($option);
        }

        //table Musiques

        for ($mus = 1; $mus <= 5; $mus++) {
            $music = new Music();

            $music->setMusicOption($option);
            $music->setGenre($faker->word());

            $manager->persist($music);
        }

        //table Reservations

        for ($res = 1; $res <= 5; $res++) {
            $reservation = new Reservation();

            $reservation->setTrajectRef($traject);
            $reservation->setAccepted($faker->boolean());
            $reservation->setPlaces($faker->numberBetween(1, 8));
            $reservation->setSmallBaggage($faker->numberBetween(0, 5));
            $reservation->setLargeBaggage($faker->numberBetween(0, 5));
            $reservation->setBookedAt(new dateTimeImmutable());

            $manager->persist($reservation);
        }

        //table Voitures

        for ($cars = 1; $cars <= 8; $cars++) {
            $car = new Car();

            $car->setOwner($user);
            $car->setCarPicture($faker->image(null, 640, 480));
            $car->setColor($faker->word());
            $car->setPlaces($faker->numberBetween(1, 8));
            $car->setSmallBaggage($faker->numberBetween(0, 5));
            $car->setLargeBaggage($faker->numberBetween(0, 5));


            $manager->persist($car);
        }

        $manager->flush();
    }
}
