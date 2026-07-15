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
        Schema::create('news', function (Blueprint $table) {
            $table->id('news_id');
            $table->foreignId('admin_id')->constrained('admins', 'admin_id')->onDelete('cascade');
            $table->string('headline');
            $table->text('content');
            $table->integer('is_featured')->default('0');
            $table->date('publish_date');
            $table->string('resource');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
