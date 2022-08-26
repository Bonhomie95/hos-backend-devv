import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import Project from "./Project"
@Entity("tbl_organization")
@Unique(["name", "countryCode"])
class Organization extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column()
    public name!: string;

    @Column()
    public countryCode!: string;

    @Column({ type: "uuid" })
    public owner!: string;

    @Column()
    public country!: string;

    @Column()
    public city!: string;

    @Column({nullable: true })
    public address!: string;

    @Column("varchar",{length:20})
    public mobileNumber!: number;

    @Column()
    public logo!: string;

    @Column({ type: 'jsonb',
    array: false,
    default: () => "'[]'"})
    public members!: string[];

    @Column({ type: 'jsonb',
    array: false,
    default: () => "'[]'"})
    public activeProjects!: string[];

    @Column({ type: 'jsonb',
    array: false,
    default: () => "'[]'"})
    public pendingInvites!: string[];

    @OneToMany(() => Project, (project) => project.organisation)
    public projects!: Project[]

    @Column({ type: 'jsonb',
    array: false,
    default: () => "'[]'"})
    public availableInvites!: string[];
    
    @CreateDateColumn({ type: "timestamp" })
    public createdAt!: Date;

    @Column({ type: "uuid", nullable: true })
    public updatedBy!: string;

    @UpdateDateColumn({
        type: "timestamp"
    })
    public updatedAt!: Date;

}

export default Organization;