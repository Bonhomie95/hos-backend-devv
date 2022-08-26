import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import { TaskStatus } from "../../constants/UtillType";
import  Project from "./Project"
import Comment  from "./TaskComment";
@Entity("tbl_task")

class Task extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({nullable: false})
    public title!: string;

    @Column( { enum: TaskStatus})
    public status: TaskStatus = TaskStatus.TODO;

    @Column()
    public description!: string;

    @Column({ type: "date", nullable: true })
    public startDate!: Date;

    @Column({ type: "date", nullable: true })
    public endDate!: Date;

    @Column({ type: "simple-array", nullable: true, default:[]})
    public taskMembers!: string[];

    @CreateDateColumn({ type: "timestamp" })
    public createdAt!: Date;
    
    @ManyToOne(() => Project, project => project.task,{
        cascade: ["insert", "update"],
    })
     project!: Project;
    
     @OneToMany(() => Comment, comment => comment.task,{
        cascade: ["insert", "update"],
    })
     public comment!:  Comment[];

    @Column({ type: "uuid", nullable: true })
    public updatedBy!: string;

    @UpdateDateColumn({
        type: "timestamp"
    })
    public updatedAt!: Date;

}

export default Task;