import { UserType } from "../../constants";
import { RoleType } from "../../types/RoleType";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity("tbl_user")
@Unique(["email", "phoneNumber"])
class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column()
    public email!: string;

    @Column()
    public password!: string;

    @Column()
    public firstName!: string;

    @Column()
    public lastName!: string;

    @Column({ nullable: true })
    public phoneNumber!: string;

    @Column({ enum: UserType })
    public userType: UserType = UserType.USER;

    @Column()
    public role!: RoleType;

    @Column({ nullable: true })
    public dateOfBirth!: Date;

    @Column({ nullable: true })
    public imageUrl!: string;

    @Column({type:"text", nullable: true, array: true})
    public userMedia!: string[];

    @Column({type:"text", nullable: true, array: true})
    public userfollowers!: string[];

    @Column({type:"text", nullable: true, array: true})
    public userContacts!: string[];

    @Column({ default: true })
    public isActive: boolean = true;

    @Column({default: false })
    public isVerified!: boolean;

    @Column({
        type: "timestamp",
        nullable: true
    })
    public lastLoginAt!: Date;

    @Column({
        type: "uuid",
        nullable: true
    })
    public createdBy!: string;

    @CreateDateColumn({ 
        type: "timestamp"
    })
    public createdAt!: Date;

    @Column({
        type: "uuid",
        nullable: true
    })
    public updatedBy!: string;

    @UpdateDateColumn({
        type: "timestamp"
    })
    public updatedAt!: Date;

}

export default User;