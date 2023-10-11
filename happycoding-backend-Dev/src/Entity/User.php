<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\ProfileController;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\RegistrationController;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => 'profileRead'],
            controller: ProfileController::class,
        ),
        new Post(
            normalizationContext: ['groups' => 'register'],
            controller: RegistrationController::class,
        ),
        new Patch(
            // normalizationContext: ['groups' => 'profileWrite'],
            controller: ProfileController::class,
        ),
    ],
    // order: ['nom' => 'ASC'],
    // paginationEnabled: false,
)]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * Field id
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['register', 'profileRead'])]
    private ?int $id = null;

    /**
     * Field email
     */
    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['register'])]
    #[Assert\NotBlank(message: "Vous devez saisir un email !")]
    #[Assert\Email(message: "Vous devez saisir un email valide !")]
    #[Assert\Length(
        min: 6,
        max: 180,
        minMessage: "Votre email doit comporter au minimum 6 caractères !",
        maxMessage: "Votre email ne doit pas comporter plus de 180 caractères !"
    )]
    private ?string $email = null;

    /**
     * Field roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * * Field password
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Groups(['register'])]
    #[Assert\NotBlank(message: "Vous devez saisir un mot de passe !")]
    #[Assert\Length(
        min: 8,
        max: 20,
        minMessage: "Le mot de passe doit comporter au minimum 8 caractères !",
        maxMessage: "Le mot de passe ne doit pas comporter plus de 20 caractères !"
    )]
    #[Assert\Regex(
        pattern: "/[A-Z]/",
        message: "Vous devez respecter le format du mot de passe !"
    )]
    #[Assert\Regex(
        pattern: "/[a-z]/",
        message: "Vous devez respecter le format du mot de passe !"
    )]
    #[Assert\Regex(
        pattern: "/[\d]/",
        message: "Vous devez respecter le format du mot de passe !"
    )]
    #[Assert\Regex(
        pattern: "/[ç&#@%\$€µ£=*\-+\/%_?.,;:!\"'<>^(){}[\]|°§¤]/",
        message: "Vous devez respecter le format du mot de passe !"
    )]
    #[Assert\Regex(
        pattern: "/[^\wç&#@%\$€µ£=*\-+\/%_?.,;:!\"'<>^(){}[\]|°§¤]/",
        match: false,
        message: "Vous devez respecter le format du mot de passe !"
    )]
    private ?string $password = null;

    /**
     * Field pseudo
     */
    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['register', 'profileRead'])]
    #[Assert\NotBlank(message: "Vous devez saisir un nom d'utilisateur !")]
    #[Assert\Length(
        min: 3,
        max: 25,
        minMessage: "Le nom d'utilisateur doit comporter au minimum 3 caractères !",
        maxMessage: "Le nom d'utilisateur ne doit pas comporter plus de 25 caractères !"
    )]
    #[Assert\Regex(
        pattern: "/^[\s]/",
        match: false,
        message: "Votre nom d'utilisateur ne doit pas commencer par un espace' !"
    )]
    #[Assert\Regex(
        pattern: "/[\s]{2,}/",
        match: false,
        message: "Votre nom d'utilisateur ne doit pas comporter plusieurs espaces à la suite !"
    )]
    #[Assert\Regex(
        pattern: "/[\s]$/",
        match: false,
        message: "Votre nom d'utilisateur ne doit pas finir par un espace !"
    )]
    private ?string $pseudo = null;

    /**
     * Field firstName
     */
    #[ORM\Column(length: 255)]
    #[Groups(['register'])]
    #[Assert\NotBlank(message: "Vous devez saisir votre prénom !")]
    #[Assert\Length(
        min: 1,
        max: 50,
        minMessage: "Votre prénom doit comporter au minimum 1 caractère !",
        maxMessage: "Votre prénom ne doit pas comporter plus de 50 caractères !"
    )]
    #[Assert\Regex(
        pattern: "/^[\-\s]/",
        match: false,
        message: "Votre prénom ne doit pas commencer par ' ' ou '-' !"
    )]
    #[Assert\Regex(
        pattern: "/[A-Za-z\-\sàâäéèêëîïôöûüÿ]/",
        message: "Votre prénom doit être valide !"
    )]
    #[Assert\Regex(
        pattern: "/[^A-Za-z\-\sàâäéèêëîïôöûüÿ]/",
        match: false,
        message: "Votre prénom ne doit pas comporter de caractères spéciaux !"
    )]
    #[Assert\Regex(
        pattern: "/[\s|-]{2,}/",
        match: false,
        message: "Votre prénom doit être valide !"
    )]
    #[Assert\Regex(
        pattern: "/[\-\s]$/",
        match: false,
        message: "Votre prénom ne doit pas finir par ' ' ou '-' !"
    )]
    private ?string $firstName = null;

    /**
     * Field lastName
     */
    #[ORM\Column(length: 255)]
    #[Groups(['register'])]
    #[Assert\NotBlank(message: "Vous devez saisir votre nom !")]
    #[Assert\Length(
        min: 1,
        max: 50,
        minMessage: "Votre nom doit comporter au minimum 1 caractère !",
        maxMessage: "Votre nom ne doit pas comporter plus de 50 caractères !"
    )]
    #[Assert\Regex(
        pattern: "/^[\-\s]/",
        match: false,
        message: "Votre nom ne doit pas commencer par ' ' ou '-' !"
    )]
    #[Assert\Regex(
        pattern: "/[A-Za-z\-\sàâäéèêëîïôöûüÿ]/",
        message: "Votre nom doit être valide !"
    )]
    #[Assert\Regex(
        pattern: "/[^A-Za-z\-\sàâäéèêëîïôöûüÿ]/",
        match: false,
        message: "Votre nom ne doit pas comporter de caractères spéciaux !"
    )]
    #[Assert\Regex(
        pattern: "/[\s|-]{2,}/",
        match: false,
        message: "Votre nom doit être valide !"
    )]
    #[Assert\Regex(
        pattern: "/[\-\s]$/",
        match: false,
        message: "Votre nom ne doit pas finir par ' ' ou '-' !"
    )]
    private ?string $lastName = null;

    /**
     * Field
     */
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * Field
     */
    #[ORM\Column]
    private ?\DateTimeImmutable $lastActivity = null;

    /**
     * Field avatar
     */
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['profileRead'])]
    private ?string $avatar = null;

    /**
     * Field birthDate
     */
    #[ORM\Column]
    #[Groups(['register'])]
    #[Assert\LessThan('-18 years', message: "Vous devez avoir au moins 18 ans !")]
    #[Assert\GreaterThan('-120 years', message: "Vous devez entrer une date de naissance valide !")]
    private ?\DateTimeImmutable $birthDate = null;

    /**
     * Field isVerified
     */
    #[ORM\Column(nullable: true)]
    private ?bool $isVerified = null;

    /**
     * Field totalCredits
     */
    #[ORM\Column]
    #[Assert\PositiveOrZero(message: "Le total ne peut pas être négatif !")]
    private ?int $totalCredits = null;

    /**
     * Field report
     */
    #[ORM\Column(nullable: true)]
    private ?bool $report = null;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Favorite::class)]
    private Collection $favorite;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Comment::class)]
    private Collection $comment;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Car::class)]
    private Collection $car;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Traject::class)]
    private Collection $traject;

    #[ORM\ManyToMany(targetEntity: Reservation::class, inversedBy: 'owner')]
    private Collection $reservation;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Option::class)]
    private Collection $options;

    public function __construct()
    {
        $this->favorite = new ArrayCollection();
        $this->comment = new ArrayCollection();
        $this->car = new ArrayCollection();
        $this->traject = new ArrayCollection();
        $this->reservation = new ArrayCollection();
        $this->options = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function setPseudo(string $pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getLastActivity(): ?\DateTimeImmutable
    {
        return $this->lastActivity;
    }

    public function setLastActivity(\DateTimeImmutable $lastActivity): self
    {
        $this->lastActivity = $lastActivity;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getBirthDate(): ?\DateTimeImmutable
    {
        return $this->birthDate;
    }

    public function setBirthDate(\DateTimeImmutable $birthDate): self
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    public function isIsVerified(): ?bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(?bool $isVerified): self
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    public function getTotalCredits(): ?int
    {
        return $this->totalCredits;
    }

    public function setTotalCredits(int $totalCredits): self
    {
        $this->totalCredits = $totalCredits;

        return $this;
    }

    public function isReport(): ?bool
    {
        return $this->report;
    }

    public function setReport(?bool $report): self
    {
        $this->report = $report;

        return $this;
    }

    /**
     * @return Collection<int, Favorite>
     */
    public function getFavorite(): Collection
    {
        return $this->favorite;
    }

    public function addFavorite(Favorite $favorite): self
    {
        if (!$this->favorite->contains($favorite)) {
            $this->favorite->add($favorite);
            $favorite->setOwner($this);
        }

        return $this;
    }

    public function removeFavorite(Favorite $favorite): self
    {
        if ($this->favorite->removeElement($favorite)) {
            // set the owning side to null (unless already changed)
            if ($favorite->getOwner() === $this) {
                $favorite->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComment(): Collection
    {
        return $this->comment;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comment->contains($comment)) {
            $this->comment->add($comment);
            $comment->setOwner($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comment->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getOwner() === $this) {
                $comment->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Car>
     */
    public function getCar(): Collection
    {
        return $this->car;
    }

    public function addCar(Car $car): self
    {
        if (!$this->car->contains($car)) {
            $this->car->add($car);
            $car->setOwner($this);
        }

        return $this;
    }

    public function removeCar(Car $car): self
    {
        if ($this->car->removeElement($car)) {
            // set the owning side to null (unless already changed)
            if ($car->getOwner() === $this) {
                $car->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Traject>
     */
    public function getTraject(): Collection
    {
        return $this->traject;
    }

    public function addTraject(Traject $traject): self
    {
        if (!$this->traject->contains($traject)) {
            $this->traject->add($traject);
            $traject->setOwner($this);
        }

        return $this;
    }

    public function removeTraject(Traject $traject): self
    {
        if ($this->traject->removeElement($traject)) {
            // set the owning side to null (unless already changed)
            if ($traject->getOwner() === $this) {
                $traject->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservation(): Collection
    {
        return $this->reservation;
    }

    public function addReservation(Reservation $reservation): self
    {
        if (!$this->reservation->contains($reservation)) {
            $this->reservation->add($reservation);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): self
    {
        $this->reservation->removeElement($reservation);

        return $this;
    }

    /**
     * @return Collection<int, Option>
     */
    public function getOptions(): Collection
    {
        return $this->options;
    }

    public function addOption(Option $option): self
    {
        if (!$this->options->contains($option)) {
            $this->options->add($option);
            $option->setOwner($this);
        }

        return $this;
    }

    public function removeOption(Option $option): self
    {
        if ($this->options->removeElement($option)) {
            // set the owning side to null (unless already changed)
            if ($option->getOwner() === $this) {
                $option->setOwner(null);
            }
        }

        return $this;
    }
}
