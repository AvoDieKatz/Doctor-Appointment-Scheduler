<?php

namespace App\DataFixtures;

use App\Entity\Department;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class DepartmentFixtures extends Fixture
{
    public const DEPT1_REF = 'dept1-ref';
    public const DEPT2_REF = 'dept2-ref';
    public const DEPT3_REF = 'dept3-ref';
    public const DEPT4_REF = 'dept4-ref';

    public function load(ObjectManager $manager): void
    {
        $dept1 = new Department();
        $dept1->setName("Pediatrics") //khoa nhi
            ->setDeleted(0);
        $manager->persist($dept1);
        $this->addReference(self::DEPT1_REF, $dept1);

        $dept2 = new Department();
        $dept2->setName("Cardiology") //khoa tim mạch
            ->setDeleted(0);
        $manager->persist($dept2);
        $this->addReference(self::DEPT2_REF, $dept2);

        $dept3 = new Department();
        $dept3->setName("Otolaryngology") //khoa tai mũi họng
            ->setDeleted(0);
        $manager->persist($dept3);
        $this->addReference(self::DEPT3_REF, $dept3);

        $dept4 = new Department();
        $dept4->setName("Endocrinology") //khoa nội tiết
            ->setDeleted(1);
        $manager->persist($dept4);
        $this->addReference(self::DEPT4_REF, $dept4);

        $manager->flush();
    }
}
