<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pending_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('contributor_name');
            $table->string('email');
            $table->string('title');
            $table->string('category');
            $table->string('file_path');
            $table->string('status')->default('pending'); // pending, approved, rejected
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pending_submissions');
    }
};
