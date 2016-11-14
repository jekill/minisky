<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Word
 *
 * @ORM\Table(name="word")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\WordRepository")
 */
class Word
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="value_en", type="string", length=255, unique=true)
     */
    private $valueEn;

    /**
     * @var string
     *
     * @ORM\Column(name="value_ru", type="string", length=255)
     */
    private $valueRu;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set valueEn
     *
     * @param string $valueEn
     *
     * @return Word
     */
    public function setValueEn($valueEn)
    {
        $this->valueEn = $valueEn;

        return $this;
    }

    /**
     * Get valueEn
     *
     * @return string
     */
    public function getValueEn()
    {
        return $this->valueEn;
    }

    /**
     * Set valueRu
     *
     * @param string $valueRu
     *
     * @return Word
     */
    public function setValueRu($valueRu)
    {
        $this->valueRu = $valueRu;

        return $this;
    }

    /**
     * Get valueRu
     *
     * @return string
     */
    public function getValueRu()
    {
        return $this->valueRu;
    }
}

