<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Entity\Word;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author: Eugeny Fomin <info@jeka.ru>
 * @Route("/api")
 */
class ApiController extends Controller
{
    /**
     * @Route("/token")
     */
    public function getTokenAction(Request $request)
    {

        $user = new User();
        $user->setUsername('Sponge Bob');
        $t = $this->get('lexik_jwt_authentication.jwt_manager')
                  ->create($user)
        ;
//        new Username
//        $this->get('doctrine.orm.entity_manager')->persist($user);
//        $this->get('doctrine.orm.entity_manager')->flush();

//        $t = $this->get('lexik_jwt_authentication.jwt_token_authenticator')
//                  ->createAuthenticatedToken($user,'username');

        return new JsonResponse(['token' => $t], Response::HTTP_CREATED);
    }

    /**
     * @Route("/words")
     */
    public function getWordsAction(Request $request)
    {
        $words = $this->get('app.word.repository')->findAll();

        $data = array_map(
            function (Word $w) {
                return [
                    'valueEn' => $w->getValueEn(),
                    'valueRu' => $w->getValueRu()
                ];
            },
            $words
        );

        return new JsonResponse($data, 200);
    }


    /**
     * @Route("/tests")
     */
    public function getGenerateTestAction(Request $request)
    {
        /** @var Word[] $words */
        $words = $this->get('app.word.repository')->findAll();

        $langWords = [
            'En' => [],
            'Ru' => []
        ];

        $data = [];
        foreach ($words as $w) {
            $langWords['En'][] = $w->getValueEn();
            $langWords['Ru'][] = $w->getValueRu();

            $data[] = [
                'valueEn' => $w->getValueEn(),
                'valueRu' => $w->getValueRu()
            ];
        }
        shuffle($data);

        $langs = ['En', 'Ru'];

        $puzzles=[];

        foreach ($data as $w) {
            $langIndex = rand(0, 1);
            $lang      = $langs[$langIndex];
            $langInv   = $langs[(int)!$langIndex];
            $word      = $w['value' . $lang];
            $answer    = $w['value' . $langInv];
            $choices   = $this->fetchTreeRandomUniqueWordsInclude($answer, $langWords[$langInv]);

            $puzzle = [
                'word'    => $word,
                'choices' => $choices
            ];

            $puzzles[]=$puzzle;
        }

        return new JsonResponse($puzzles, 200);
    }

    private function fetchTreeRandomUniqueWordsInclude($includeWord, $fromWordList)
    {
        $fromWordList = []+$fromWordList;
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