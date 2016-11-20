<?php

namespace AppBundle\Services;

use AppBundle\Entity\Word;
use AppBundle\Exceptions\AppException;
use AppBundle\Model\WordsTest;
use AppBundle\Repository\WordRepository;

/**
 * @author: Eugeny Fomin <info@jeka.ru>
 */
class TestsHelper
{
    /**
     * @var WordRepository
     */
    private $wordRepository;

    public function __construct(WordRepository $wordRepository)
    {
        $this->wordRepository = $wordRepository;
    }


    public function generateWordsTest($maxPuzzles = 10)
    {
        /** @var Word[] $words */
        $words = $this->wordRepository->findAll();

        if (count($words) < 3) {
            throw new \Exception('The word list is too small');
        }

        $langWords = [
            'En' => [],
            'Ru' => []
        ];

        $data = [];

        $i = 0;
        foreach ($words as $w) {
            $langWords['En'][] = $w->getValueEn();
            $langWords['Ru'][] = $w->getValueRu();

            $data[] = [
                'valueEn' => $w->getValueEn(),
                'valueRu' => $w->getValueRu()
            ];
            $i++;
            if ($i > $maxPuzzles) {
                break;
            }
        }

        shuffle($data);

        $langs = ['En', 'Ru'];

        $puzzles = [];

        foreach ($data as $w) {
            $langIndex = rand(0, 1);
            $lang      = $langs[$langIndex];
            $langInv   = $langs[(int)!$langIndex];
            $word      = $w['value' . $lang];
            $answer    = $w['value' . $langInv];
            $choices   = $this->fetchTreeRandomUniqueWordsInclude($answer, $langWords[$langInv]);

            $puzzle = [
                'lang'    => strtolower($lang),
                'word'    => $word,
                'choices' => $choices
            ];

            $puzzles[] = $puzzle;
        }

        $test          = new WordsTest();
        $test->puzzles = $puzzles;

        return $test;
    }

    /**
     * @param $includeWord  string
     * @param $fromWordList string[]
     *
     * @return string[]
     * @throws AppException
     */
    public function fetchTreeRandomUniqueWordsInclude($includeWord, $fromWordList)
    {
        if (count($fromWordList) < 3) {
            throw  new AppException('The word list is too small');
        }

        shuffle($fromWordList);

        $result = [];

        for ($i = 0; $i < 3 && count($result) < 2; $i++) {
            $word = $fromWordList[$i];
            if ($word !== $includeWord) {
                $result[] = $word;
            }
        }

        $result[] = $includeWord;
        shuffle($result);

        return $result;
    }
}