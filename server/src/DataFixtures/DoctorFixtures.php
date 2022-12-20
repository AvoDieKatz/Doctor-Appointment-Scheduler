<?php

namespace App\DataFixtures;

use App\Entity\Doctor;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class DoctorFixtures extends Fixture implements DependentFixtureInterface
{

    public const DOC1_REF = 'doc1-ref';
    public const DOC2_REF = 'doc2-ref';
    public const DOC3_REF = 'doc3-ref';
    
    public function load(ObjectManager $manager): void
    {
        $doctor1 = new Doctor();
        $doctor1->setName("Tran Van B")
            ->setUserId($this->getReference(UserFixtures::USER3_REF))
            ->setDepartment($this->getReference(DepartmentFixtures::DEPT1_REF))
            ->setDeleted(0);
        $manager->persist($doctor1);
        $this->addReference(self::DOC1_REF, $doctor1);

        $doctor2 = new Doctor();
        $doctor2->setName("Vu Van D")
            ->setUserId($this->getReference(UserFixtures::USER5_REF))
            ->setDepartment($this->getReference(DepartmentFixtures::DEPT2_REF))
            ->setDeleted(0);
        $manager->persist($doctor2);
        $this->addReference(self::DOC2_REF, $doctor2);

        $doctor3 = new Doctor();
        $doctor3->setName("Nguyen Van Z")
            ->setUserId($this->getReference(UserFixtures::USER6_REF))
            ->setDepartment($this->getReference(DepartmentFixtures::DEPT2_REF))
            ->setDeleted(0);
        $manager->persist($doctor3);
        $this->addReference(self::DOC3_REF, $doctor3);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
            DepartmentFixtures::class
        ];
    }
}
