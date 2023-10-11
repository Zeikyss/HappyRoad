<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TrajectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TrajectRepository::class)]
#[ApiResource]
class Traject
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private array $passengers = [];

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $places = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $price = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $smallBaggage = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $largeBaggage = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $startTime = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'traject')]
    private ?User $owner = null;

    #[ORM\OneToMany(mappedBy: 'trajectRef', targetEntity: Reservation::class)]
    private Collection $reservationRef;

    #[ORM\OneToMany(mappedBy: 'traject', targetEntity: Address::class)]
    private Collection $addresses;

    public function __construct()
    {
        $this->reservationRef = new ArrayCollection();
        $this->addresses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPassengers(): array
    {
        return $this->passengers;
    }

    public function setPassengers(?array $passengers): self
    {
        $this->passengers = $passengers;

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

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

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

    public function getStartTime(): ?\DateTimeImmutable
    {
        return $this->startTime;
    }

    public function setStartTime(\DateTimeImmutable $startTime): self
    {
        $this->startTime = $startTime;

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

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservationRef(): Collection
    {
        return $this->reservationRef;
    }

    public function addReservationRef(Reservation $reservationRef): self
    {
        if (!$this->reservationRef->contains($reservationRef)) {
            $this->reservationRef->add($reservationRef);
            $reservationRef->setTrajectRef($this);
        }

        return $this;
    }

    public function removeReservationRef(Reservation $reservationRef): self
    {
        if ($this->reservationRef->removeElement($reservationRef)) {
            // set the owning side to null (unless already changed)
            if ($reservationRef->getTrajectRef() === $this) {
                $reservationRef->setTrajectRef(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Address>
     */
    public function getAddresses(): Collection
    {
        return $this->addresses;
    }

    public function addAddress(Address $address): self
    {
        if (!$this->addresses->contains($address)) {
            $this->addresses->add($address);
            $address->setTraject($this);
        }

        return $this;
    }

    public function removeAddress(Address $address): self
    {
        if ($this->addresses->removeElement($address)) {
            // set the owning side to null (unless already changed)
            if ($address->getTraject() === $this) {
                $address->setTraject(null);
            }
        }

        return $this;
    }
}
