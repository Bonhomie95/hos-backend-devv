import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity("tbl_user_verify_token")
@Unique(["userId"])
class UserVerifyToken extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public token!: string;

    @Column({
        type: "uuid"
    })
    public userId!: string;

    @UpdateDateColumn({
        type: "timestamp"
    })
    public expiresAt!: Date;

}

export default UserVerifyToken;