import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 250, nullable: false })
    name: string;

    @Column({ type: "varchar", unique: true, length: 250, nullable: false })
    email: string;

    @Column({ type: "varchar", length: 250, nullable: false })
    password: string;

    @Column({ type: "varchar" , length: 500, nullable: true})
    refreshToken: string | null;

}
