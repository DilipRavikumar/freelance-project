import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  template: `
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">FreelancePro</h1>
          </div>
          <div class="flex space-x-4">
            <button pButton label="Login" class="p-button-text" (click)="navigateToLogin()"></button>
            <button pButton label="Get Started" class="p-button-sm" (click)="navigateToRegister()"></button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="bg-gray-50 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect with Top <span class="text-green-600">Freelancers</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find skilled professionals for your projects or showcase your expertise to clients worldwide. 
            Join thousands of successful freelancers and businesses.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button pButton label="Find Freelancers" class="p-button-lg" (click)="navigateToRegister()"></button>
            <button pButton label="Start Freelancing" class="p-button-outlined p-button-lg" (click)="navigateToRegister()"></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose FreelancePro?</h2>
          <p class="text-lg text-gray-600">Everything you need to succeed in the freelance economy</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">Project Management</h3>
            <p class="text-gray-600">Streamlined tools to manage projects, deadlines, and deliverables efficiently</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">Secure Payments</h3>
            <p class="text-gray-600">Protected transactions with escrow services and multiple payment options</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">Global Network</h3>
            <p class="text-gray-600">Connect with clients and freelancers from around the world</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-green-600 mb-2">50K+</div>
            <div class="text-gray-600">Active Freelancers</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-green-600 mb-2">25K+</div>
            <div class="text-gray-600">Projects Completed</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div class="text-gray-600">Client Satisfaction</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div class="text-gray-600">Support Available</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-green-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p class="text-xl text-green-100 mb-8">Join thousands of professionals already using FreelancePro</p>
        <button pButton label="Start Your Journey" class="p-button-lg p-button-secondary" (click)="navigateToRegister()"></button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">FreelancePro</h3>
            <p class="text-gray-400">Connecting talent with opportunity worldwide.</p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">For Freelancers</h4>
            <ul class="space-y-2 text-gray-400">
              <li>Find Work</li>
              <li>Build Portfolio</li>
              <li>Get Paid</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">For Clients</h4>
            <ul class="space-y-2 text-gray-400">
              <li>Post Projects</li>
              <li>Find Talent</li>
              <li>Manage Teams</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Support</h4>
            <ul class="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FreelancePro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
})
export class LandingComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
