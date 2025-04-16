
import { useState } from "react";
import LinkedInBanner from "./LinkedInBanner";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

const BannerPreview = () => {
  const [scale, setScale] = useState(0.25);
  
  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">LinkedIn Banner Preview</h1>
        
        <div className="mb-8">
          <div className="border border-gray-800 rounded-lg overflow-hidden shadow-xl bg-gray-900">
            <div className="overflow-auto p-4">
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }} className="w-max">
                <LinkedInBanner />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="text-white">Zoom:</div>
            <input 
              type="range" 
              min="0.1" 
              max="0.5" 
              step="0.05" 
              value={scale} 
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-48"
            />
            <div className="text-white">{Math.round(scale * 100)}%</div>
            <Button variant="outline" className="ml-auto flex items-center gap-2">
              <Download size={16} />
              <span>Save Banner</span>
            </Button>
          </div>
        </div>
        
        <div className="mb-8 bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Instructions:</h2>
          <ol className="list-decimal pl-6 text-gray-300 space-y-2">
            <li>Right-click on the banner above and select "Save image as..."</li>
            <li>Save the image to your computer</li>
            <li>Go to your LinkedIn profile</li>
            <li>Click the edit icon (pencil) on your profile banner</li>
            <li>Upload the saved banner image</li>
            <li>Adjust positioning if needed</li>
            <li>Save your changes</li>
          </ol>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Note:</h2>
          <p className="text-gray-300">
            LinkedIn banner dimensions are 1584 × 396 pixels. This banner has been designed to match these dimensions 
            and complement your portfolio's color scheme and style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerPreview;
