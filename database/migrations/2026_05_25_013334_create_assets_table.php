<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id('asset_id');
            $table->unsignedBigInteger('cont_id')->nullable();
            $table->string('title');
            $table->string('category');
            $table->string('status')->default('published');
            $table->string('file_path');
            $table->integer('views')->default(0);
            $table->timestamps();
            $table->foreign('cont_id')->references('cont_id')->on('contributors')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
