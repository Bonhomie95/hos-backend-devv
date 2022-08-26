import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import  Project from "./Project"
@Entity("tbl_comment")

class Comment extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ nullable: false})
    public name!: string;
    @Column ({ nullable: false})
    public text!: string;

    @OneToMany(() => Comment, (comment) => comment.parentId, { nullable: true, createForeignKeyConstraints: false })
    reply?: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.reply, { nullable: true, createForeignKeyConstraints: false })
   parentId?: Comment;

    @Column({  default: false})
    public disable_comment!: boolean
    
    @Column({  default: true})
    public origin!: boolean
    
    @ManyToOne(() => Project, project => project.comment,{
        cascade: ["insert", "update"],
    })
    project!: Project;

    @CreateDateColumn({ type: "timestamp" })
    public createdAt!: Date;

    @UpdateDateColumn({
        type: "timestamp"
    })
    public updatedAt!: Date;

}

export default Comment;

