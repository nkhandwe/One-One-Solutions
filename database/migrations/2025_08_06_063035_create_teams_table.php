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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Team name');
            $table->string('designation')->nullable()->comment('Role or title within the team');
            $table->string('image')->nullable()->comment('Profile or team member photo');
            $table->string('email')->nullable()->comment('Contact email');
            $table->string('phone')->nullable()->comment('Contact phone number');
            $table->text('description')->nullable()->comment('Short bio or description');
            $table->unsignedInteger('position')->default(1)->comment('Display order');
            $table->boolean('is_active')->default(true)->comment('Visibility status');
            $table->timestamps();
            $table->softDeletes(); // Optional: support soft deletion
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
