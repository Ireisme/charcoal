import Vue from 'vue'
import { AuthService } from './auth.service';

declare module 'vue/types/vue' {
  interface Vue {
    $auth: AuthService
  }
}