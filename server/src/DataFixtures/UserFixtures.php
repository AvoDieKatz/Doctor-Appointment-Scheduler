<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{

    public const USER1_REF = 'user1-ref';
    public const USER2_REF = 'user2-ref';
    public const USER3_REF = 'user3-ref';
    public const USER4_REF = 'user4-ref';
    public const USER5_REF = 'user5-ref';

    public function load(ObjectManager $manager): void
    {
        $user1 = new User();
        $user1->setUsername('nguyenvana')
            ->setPassword('abcd1234')
            ->setRoles([]);
        $manager->persist($user1);
        $this->addReference(self::USER1_REF, $user1);

        $user2 = new User();
        $user2->setUsername('admin')
            ->setPassword('abcd1234')
            ->setRoles(['ROLE_ADMIN']);
        $manager->persist($user2);
        $this->addReference(self::USER2_REF, $user2);

        $user3 = new User();
        $user3->setUsername('tranvanb')
            ->setPassword('abcd1234')
            ->setRoles(['ROLE_DOCTOR']);
        $manager->persist($user3);
        $this->addReference(self::USER3_REF, $user3);

        $user4 = new User();
        $user4->setUsername('nguyenvanc')
            ->setPassword('abcd1234')
            ->setRoles([]);
        $manager->persist($user4);
        $this->addReference(self::USER4_REF, $user4);

        $user5 = new User();
        $user5->setUsername('vuvand')
            ->setPassword('abcd1234')
            ->setRoles(['ROLE_DOCTOR']);
        $manager->persist($user5);
        $this->addReference(self::USER5_REF, $user5);

        $manager->flush();
    }
}
