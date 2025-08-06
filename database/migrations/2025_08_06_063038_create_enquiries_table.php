<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->comment('Name of the person making the enquiry');
            $table->string('email')->nullable()->comment('Email address');
            $table->string('phone')->nullable()->comment('Phone number');
            $table->string('subject')->nullable()->comment('Subject of the enquiry');
            $table->text('message')->nullable()->comment('Enquiry message content');
            $table->string('ip_address')->nullable()->comment('Visitor IP address');
            $table->string('user_agent')->nullable()->comment('Browser user agent');
            $table->string('page_url')->nullable()->comment('Page from where enquiry was submitted');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enquiries');
    }
};
