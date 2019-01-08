<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class PortfolioController extends Controller
{
    /**
     * @Route("/portfolio", name="portfolio")
     */
    public function portfolioAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('portfolio/portfolio.html.twig', []);
    }

    /**
     * @Route("/portfolio/galleries", name="galleries")
     */
    public function galleriesAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('portfolio/bootstrap/galleries.html.twig', []);
    }

    /**
     * @Route("/portfolio/drawing", name="drawing")
     */
    public function drawingAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('portfolio/jQuery/drawing.html.twig', []);
    }

    /**
     * @Route("/portfolio/todolist", name="todolist")
     */
    public function todolistAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('portfolio/javascript/todolist.html.twig', []);
    }

    /**
     * @Route("/portfolio/slick", name="slick")
     */
    public function slickAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('portfolio/jQuery/slick.html.twig', []);
    }

    /**
     * @Route("/portfolio/gallery", name="gallery")
     */
    public function galleryAction(Request $request)
    {
        //$this->denyAccessUnlessGranted('ROLE_USER');

        $doctrine = $this->getDoctrine();
        $repository = $doctrine->getRepository('AppBundle:Image');
        //$repository2 = $doctrine->getRepository('AppBundle:FileUpload');

        $securityContext = $this->container->get('security.authorization_checker');
        if ($securityContext->isGranted('IS_AUTHENTICATED_ANONYMOUSLY')) {
            $images = $repository->findAll();
        }
        else {
            $images = $repository->findByUser($this->getUser()->getId());
        }

        //$fileUpload = $repository2->findAll();


        // replace this example code with whatever you need
        return $this->render('portfolio/bootstrap/gallery.html.twig',
            [
                'images' => $images
                //'files' => $fileUpload
            ]);
    }

    /**
     * @Route("/portfolio/social", name="social")
     */
    public function socialAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('portfolio/bootstrap/social.html.twig', []);
    }

    /**
     * @Route("/portfolio/formjquery", name="formjquery")
     */
    public function formjqueryAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('portfolio/jQuery/formjquery.html.twig', []);
    }
}