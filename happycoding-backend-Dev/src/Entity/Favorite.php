<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FavoriteRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FavoriteRepository::class)]
#[ApiResource]
class Favorite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private array $userId = [];

    #[ORM\ManyToOne(inversedBy: 'favorite')]
    private ?User $owner = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): array
    {
        return $this->userId;
    }

    public function setUserId(?array $userId): self
    {
        $this->userId = $userId;

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
}
