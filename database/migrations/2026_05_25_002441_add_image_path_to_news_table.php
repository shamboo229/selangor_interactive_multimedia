<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Adds the new column. 'nullable' means an article can exist without a picture.
            $table->string('image_path')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Removes the column if you ever rollback the database
            $table->dropColumn('image_path');
        });
    }
};
