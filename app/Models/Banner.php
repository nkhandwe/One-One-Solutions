<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Banner extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'subtitle',
        'image',
        'link',
        'button_text',
        'position',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'position' => 'integer',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /**
     * Scope for active banners
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for inactive banners
     */
    public function scopeInactive($query)
    {
        return $query->where('is_active', false);
    }

    /**
     * Scope for ordered banners
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('position', 'asc');
    }

    /**
     * Get status attribute
     */
    public function getStatusAttribute()
    {
        return $this->is_active ? 'active' : 'inactive';
    }

    /**
     * Get formatted position attribute
     */
    public function getFormattedPositionAttribute()
    {
        return '#' . $this->position;
    }

    /**
     * Get next available position
     */
    public static function getNextPosition()
    {
        return static::max('position') + 1;
    }

    /**
     * Get image URL attribute
     */
    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return asset('storage/' . $this->image);
        }
        return null;
    }

    /**
     * Check if banner has image
     */
    public function hasImage()
    {
        return !empty($this->image);
    }

    /**
     * Check if banner has link
     */
    public function hasLink()
    {
        return !empty($this->link);
    }

    /**
     * Check if banner has button
     */
    public function hasButton()
    {
        return !empty($this->button_text);
    }
}
