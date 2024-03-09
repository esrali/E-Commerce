import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

constructor(private _AuthService:AuthService,private _Router:Router){}
forgetFlag:boolean=true;
verifyFlag:boolean=false;
newPassFlag:boolean=false;
isLoading:boolean=false;
complete:boolean=false;
errMessage !: string;
inputType: string = 'password';
newInputType: string = 'password';

loginForm:FormGroup=new FormGroup({
  email: new FormControl(null,[Validators.email,Validators.required]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{6}/)]),
})

logInSubmit():void{
  if(this.loginForm.valid)
  {
    this.isLoading=true;
  this._AuthService.loginApi(this.loginForm.value).subscribe({
    next :(res)=>
    {
      this.isLoading=false;
      if(res.message=="success")
      {
        //1-5zent el token fe local storage
        localStorage.setItem("userToken",res.token)
        //2-هنادى الميسود اللي بتفك تشفير التوكين
        this._AuthService.saveDataMethod();
        //3- عايزا بقا اروح لصفحه ال هوم
        this._Router.navigate(['/home']);
      }
    },
    error:(err)=>
    {
      this.errMessage=err.error.message;
      this.isLoading=false;
    }
  }

  )
  }
  else{
    this.loginForm.markAllAsTouched();
  }
}

forgetForm:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email])
})
verifyForm:FormGroup=new FormGroup({
  resetCode:new FormControl(null,[Validators.required])
})
newPassForm:FormGroup=new FormGroup({
  email: new FormControl(null,[Validators.email,Validators.required]),
  newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{6}/)]),
})

forgetPassMethod(){
  this.isLoading=true;
  this._AuthService.forgetPassApi(this.forgetForm.value).subscribe({
    next :(res)=>
    {
      this.isLoading=false;
      if(res.message)
      {
        this.forgetFlag=false;
        this.verifyFlag=true;
      }
    },
    error:(err)=>
    {
      this.errMessage=err.error.message;
      this.isLoading=false;
    }
  }

  )
}

verifyMethod(){
  this.isLoading=true;
  this._AuthService.verifyApi(this.verifyForm.value).subscribe({
    next :(res)=>
    {
      this.isLoading=false;
      if(res.status=="Success")
      {
        this.verifyFlag=false;
        this.newPassFlag=true;
      }
    },
    error:(err)=>
    {
      this.errMessage=err.error.message;
      this.isLoading=false;
    }
  }

  )
}
setNewPassMethod(){
  this.isLoading=true;
  this._AuthService.newPassApi(this.newPassForm.value).subscribe({
    next :(res)=>
    {
      this.isLoading=false;
      if(res.token)
      {
        console.log(" new tmam")
        this.complete=true;
      }
    },
    error:(err)=>
    {
      this.errMessage=err.error.message;
      this.isLoading=false;
    }
  }

  )
}

togglePasswordVisibility(input: HTMLInputElement) {
  input.type = (input.type === 'password') ? 'text' : 'password';
  this.inputType = (this.inputType === 'password') ? 'text' : 'password';
}
toggleNewPasswordVisibility(input: HTMLInputElement) {
  input.type = (input.type === 'password') ? 'text' : 'password';
  this.newInputType = (this.inputType === 'password') ? 'text' : 'password';
}
}
