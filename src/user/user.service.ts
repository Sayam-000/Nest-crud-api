import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UserRepository } from './repo/user.repository';

@Injectable()
export class UserService {

  //inject user repository through constructor ***
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){
  }

  //custom repository injection ###
  // constructor(private readonly userRepository: UserRepository){
  // }

  create(createUserDto: CreateUserDto) : Promise<User> {
    let user : User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.age = createUserDto.age;

    return this.userRepository.save(user); //promise ke form mein DB pe save hue data return karega.

    // return 'This action adds a new user';
  }

  findAll() : Promise<User[]>{
    return this.userRepository.find(); 
    // return `This action returns all user`;
  }

  findOne(id) {
     return this.userRepository.findOne(id) //.....................................................................
    // return `This action returns a #${id} user`;
  }

  //custom repository method ###
  // findUserByAge(age: number){
  //   return this.userRepository.getUserByAge(age);
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user : User = new User();
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.age = updateUserDto.age;
    user.id = id;

    return this.userRepository.save(user);
    // return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
    // return `This action removes a #${id} user`;
  }
}
