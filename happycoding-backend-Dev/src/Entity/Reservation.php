<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ReservationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
#[ApiResource]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $accepted = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $places = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $smallBaggage = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $largeBaggage = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $bookedAt = null;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'reservation')]
    private Collection $owner;

    #[ORM\ManyToOne(inversedBy: 'reservationRef')]
    private ?Traject $trajectRef = null;

    public function __construct()
    {
        $this->owner = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isAccepted(): ?bool
    {
        return $this->accepted;
    }

    public function setAccepted(bool $accepted): self
    {
        $this->accepted = $accepted;

        return $this;
    }

    public function getPlaces(): ?int
    {
        return $this->places;
    }

    public function setPlaces(int $places): self
    {
        $this->places = $places;

        return $this;
    }

    public function getSmallBaggage(): ?int
    {
        return $this->smallBaggage;
    }

    public function setSmallBaggage(int $smallBaggage): self
    {
        $this->smallBaggage = $smallBaggage;

        return $this;
    }

    public function getLargeBaggage(): ?int
    {
        return $this->largeBaggage;
    }

    public function setLargeBaggage(int $largeBaggage): self
    {
        $this->largeBaggage = $largeBaggage;

        return $this;
    }

    public function getBookedAt(): ?\DateTimeImmutable
    {
        return $this->bookedAt;
    }

    public function setBookedAt(?\DateTimeImmutable $bookedAt): self
    {
        $this->bookedAt = $bookedAt;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getOwner(): Collection
    {
        return $this->owner;
    }

    public function addOwner(User $owner): self
    {
        if (!$this->owner->contains($owner)) {
            $this->owner->add($owner);
            $owner->addReservation($this);
        }

        return $this;
    }

    public function removeOwner(User $owner): self
    {
        if ($this->owner->removeElement($owner)) {
            $owner->removeReservation($this);
        }

        return $this;
    }

    public function getTrajectRef(): ?Traject
    {
        return $this->trajectRef;
    }

    public function setTrajectRef(?Traject $trajectRef): self
    {
        $this->trajectRef = $trajectRef;

        return $this;
    }
}
