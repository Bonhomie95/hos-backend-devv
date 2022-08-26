import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
@Entity("tbl_user_post")

class UserPost extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({nullable: false})
    public title!: string;
    
    @Column({nullable: false})
    public body!: string;

    @Column({type: "int",default: 0, nullable: false})
    public likeCount!: number;

    @Column({type:"text", nullable: true, array: true})
    public comments!: string[];

    @Column({type:"text", nullable: true, array: true})
    public likes!: string[];

    @CreateDateColumn({ type: "timestamp" })
    public createdAt!: Date;
    
    @UpdateDateColumn({
        type: "timestamp"
    })
    public updatedAt!: Date;

}

export default UserPost;