import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import  Task from "./Task"
@Entity("tbl_task_comment")

class TaskComment extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ nullable: false})
    public name!: string;

    @Column ({ nullable: false})
    public text!: string;

    @OneToMany(() => TaskComment, (task_comment) => task_comment.parentId, { nullable: true, createForeignKeyConstraints: false })
    replys!: TaskComment[];

   @ManyToOne(() => TaskComment, (task_comment) => task_comment.replys, { nullable: true, createForeignKeyConstraints: false })
   parentId!: TaskComment;
    
    @Column({  default: true})
    public origin!: boolean
    
    @ManyToOne(() => Task, task => task.comment,{
        cascade: ["insert", "update"],
    })
    task!: Task;

    @CreateDateColumn({ type: "timestamp" })
    public createdAt!: Date;

    @UpdateDateColumn({
        type: "timestamp"
    })
    public updatedAt!: Date;

}

export default TaskComment;

