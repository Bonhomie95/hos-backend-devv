import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity("tbl_user_session")
class UserSession extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public token!: string;

    @Column({
        type: "uuid"
    })
    public userId!: string;

    @Column()
    public ipAddress!: string;

    @Column()
    public platform!: string;

    @UpdateDateColumn({
        type: "timestamp"
    })
    public expiresAt!: Date;

}

export default UserSession;