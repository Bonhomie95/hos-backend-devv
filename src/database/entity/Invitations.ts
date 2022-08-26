import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity("tbl_invitations")
class Invitations extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column()
    public link!: string;

    @Column()
    public senderId!: string;

    @Column()
    public receiverId!: string;

    @Column()
    public senderMsg!: string;

    @Column()
    public senderName!: string;

    @CreateDateColumn({ type: "timestamp" })
    public createdAt!: Date;

    @UpdateDateColumn({
        type: "timestamp"
    })
    public updatedAt!: Date;

}

export default Invitations;