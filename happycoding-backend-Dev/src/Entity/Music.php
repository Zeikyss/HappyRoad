<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MusicRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MusicRepository::class)]
#[ApiResource]
class Music
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $genre = null;

    #[ORM\ManyToOne(inversedBy: 'musicOption')]
    private ?Option $musicOption = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGenre(): ?string
    {
        return $this->genre;
    }

    public function setGenre(string $genre): self
    {
        $this->genre = $genre;

        return $this;
    }

    public function getMusicOption(): ?Option
    {
        return $this->musicOption;
    }

    public function setMusicOption(?Option $musicOption): self
    {
        $this->musicOption = $musicOption;

        return $this;
    }
}
