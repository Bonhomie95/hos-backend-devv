import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import  Organisation from "./Organization"
import Comment  from "./comment";
import Task from "./Task"
@Entity("tbl_project")
//@Unique(["id"])
class project extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column()
    public name!: string;

    @Column()
    public description!: string;

    @Column()
    public artistName!: string;

    @Column()
    public projectType!: string;

    @Column({ type: "date", nullable: true })
    public startDate!: Date;

    @Column({ type: "date", nullable: true })
    public endDate!: Date;

    @Column({type:"text", nullable: true, array: true})
    public projectMembers!: string[];

    @CreateDateColumn({ type: "timestamp" })
    public createdAt!: Date;
    
    @ManyToOne(() => Organisation, organisation => organisation.projects,{
        cascade: ["insert", "update"],
    })
     organisation!: Organisation;
    
     @OneToMany(() => Comment, comment => comment.project,{
        cascade: ["insert", "update"],
    })
     public comment!:  Comment[];
     
     @OneToMany(() => Task, task => task.project,{
        cascade: ["insert", "update"],
    })
     public task!:  Task[];

    @Column({ type: "uuid", nullable: true })
    public updatedBy!: string;

    @UpdateDateColumn({
        type: "timestamp"
    })
    public updatedAt!: Date;

}

export default project;