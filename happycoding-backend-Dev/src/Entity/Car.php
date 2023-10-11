<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CarRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CarRepository::class)]
#[ApiResource]
class Car
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $carPicture = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $color = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $places = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $smallBaggage = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $largeBaggage = null;

    #[ORM\ManyToOne(inversedBy: 'car')]
    private ?User $owner = null;

    #[ORM\ManyToOne]
    private ?Model $model = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCarPicture(): ?string
    {
        return $this->carPicture;
    }

    public function setCarPicture(?string $carPicture): self
    {
        $this->carPicture = $carPicture;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): self
    {
        $this->color = $color;

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

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getModel(): ?Model
    {
        return $this->model;
    }

    public function setModel(?Model $model): self
    {
        $this->model = $model;

        return $this;
    }
}
