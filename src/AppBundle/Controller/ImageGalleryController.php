<?php

namespace AppBundle\Controller;

use AppBundle\Entity\FileUpload;
use AppBundle\Entity\Image;
use AppBundle\Form\Type\ImageGalleryType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;

class ImageGalleryController extends Controller
{
    /**
     * @Route("/portfolio/addimage", name="addImage")
     */
    public function addImageAction(Request $request)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $session = new Session();
        $image = new Image();

        $form = $this->createForm(ImageGalleryType::class, $image);
        $form->handleRequest($request);

        if ($form->isValid())
        {
            $image = $form->getData();
            $image->setUserImage($this->getUser()->getId());

            $em = $this->getDoctrine()->getManager();
            $em->persist($image);
            $em->flush();

            $session->getFlashBag()->add('info', 'Image ajoutée correctement !');

            

            return $this->redirectToRoute('gallery');
        }

        // replace this example code with whatever you need
        return $this->render('portfolio/bootstrap/imagegallery.html.twig', ['form' => $form->createView()]);
    }

    /**
     * @Route("/portfolio/deleteimage/{id}", name="deleteImage")
     */
    public function deleteImageAction(Request $request, $id)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $session = new Session();

        $doctrine = $this->getDoctrine();
        $em = $doctrine->getManager();
        $repository = $this->getDoctrine()->getRepository('AppBundle:Image');

        $image = $repository->find($id);

        if ($image->isAuthor($this->getUser()))
        {
            $em->remove($image);
            $em->flush();

            $session->getFlashBag()->add('success', 'Image supprimé');
        }
        else {
            $session->getFlashBag()->add('danger', 'Image non supprimé : vous n\'êtes pas le propiétaire');
        }

        return $this->redirectToRoute('gallery');
    }
}
