<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\OptionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OptionRepository::class)]
#[ORM\Table(name: '`option`')]
#[ApiResource]
class Option
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $silence = null;

    #[ORM\Column]
    private ?bool $smoke = null;

    #[ORM\Column]
    private ?bool $animals = null;

    #[ORM\Column]
    private ?bool $music = null;

    #[ORM\ManyToOne(inversedBy: 'options')]
    private ?User $owner = null;

    #[ORM\OneToMany(mappedBy: 'musicOption', targetEntity: Music::class)]
    private Collection $musicOption;

    public function __construct()
    {
        $this->musicOption = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isSilence(): ?bool
    {
        return $this->silence;
    }

    public function setSilence(bool $silence): self
    {
        $this->silence = $silence;

        return $this;
    }

    public function isSmoke(): ?bool
    {
        return $this->smoke;
    }

    public function setSmoke(bool $smoke): self
    {
        $this->smoke = $smoke;

        return $this;
    }

    public function isAnimals(): ?bool
    {
        return $this->animals;
    }

    public function setAnimals(bool $animals): self
    {
        $this->animals = $animals;

        return $this;
    }

    public function isMusic(): ?bool
    {
        return $this->music;
    }

    public function setMusic(bool $music): self
    {
        $this->music = $music;

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
     * @return Collection<int, Music>
     */
    public function getMusicOption(): Collection
    {
        return $this->musicOption;
    }

    public function addMusicOption(Music $musicOption): self
    {
        if (!$this->musicOption->contains($musicOption)) {
            $this->musicOption->add($musicOption);
            $musicOption->setMusicOption($this);
        }

        return $this;
    }

    public function removeMusicOption(Music $musicOption): self
    {
        if ($this->musicOption->removeElement($musicOption)) {
            // set the owning side to null (unless already changed)
            if ($musicOption->getMusicOption() === $this) {
                $musicOption->setMusicOption(null);
            }
        }

        return $this;
    }
}
