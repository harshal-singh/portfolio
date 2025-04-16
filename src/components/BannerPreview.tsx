
import { useState } from "react";
import LinkedInBanner from "./LinkedInBanner";
import { Button } from "./ui/button";
import { Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, User } from "lucide-react";
import html2canvas from "html2canvas";

const BannerPreview = () => {
  const [scale, setScale] = useState(0.25);
  const [currentVariant, setCurrentVariant] = useState(1);
  
  const increaseZoom = () => {
    setScale(prev => Math.min(prev + 0.05, 0.5));
  };
  
  const decreaseZoom = () => {
    setScale(prev => Math.max(prev - 0.05, 0.1));
  };
  
  const nextVariant = () => {
    setCurrentVariant(prev => prev === 3 ? 1 : prev + 1);
  };
  
  const prevVariant = () => {
    setCurrentVariant(prev => prev === 1 ? 3 : prev - 1);
  };
  
  const downloadBanner = async () => {
    const bannerElement = document.getElementById('linkedin-banner');
    if (!bannerElement) return;
    
    try {
      const canvas = await html2canvas(bannerElement, {
        scale: 2, // Higher scale for better quality
        backgroundColor: null,
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = `linkedin-banner-variant-${currentVariant}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating banner:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">LinkedIn Banner Preview</h1>
        
        <div className="mb-8">
          <div className="border border-gray-800 rounded-lg overflow-hidden shadow-xl bg-gray-900 relative">
            <div className="flex justify-between items-center p-2 border-b border-gray-800">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={prevVariant} className="text-gray-400">
                  <ChevronLeft size={16} />
                </Button>
                <div className="text-gray-400 mx-2">Variant {currentVariant} of 3</div>
                <Button variant="ghost" size="sm" onClick={nextVariant} className="text-gray-400">
                  <ChevronRight size={16} />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={decreaseZoom} className="text-gray-400">
                  <ZoomOut size={16} />
                </Button>
                <Button variant="ghost" size="sm" onClick={increaseZoom} className="text-gray-400">
                  <ZoomIn size={16} />
                </Button>
              </div>
            </div>
            <div className="overflow-auto p-4">
              <div 
                id="linkedin-banner"
                style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }} 
                className="w-max relative"
              >
                <LinkedInBanner variant={currentVariant} />
                
                {/* LinkedIn profile circle overlay simulation */}
                <div className="absolute left-[152px] -bottom-12 w-[200px] h-[200px] rounded-full border-[8px] border-gray-900 bg-gray-900/90 flex items-center justify-center">
                  <User size={64} className="text-gray-700" />
                </div>
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
            <Button variant="outline" className="ml-auto flex items-center gap-2" onClick={downloadBanner}>
              <Download size={16} />
              <span>Save Banner</span>
            </Button>
          </div>
        </div>
        
        <div className="mb-8 bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Important Notes:</h2>
          <ul className="text-gray-300 space-y-2 list-disc pl-6">
            <li><strong>Profile Placement:</strong> The banner is designed with the LinkedIn profile picture overlay in mind.</li>
            <li><strong>Clean Space:</strong> Keep the left 320px area clear as it will be partially covered by your profile picture and info.</li>
            <li><strong>Dimensions:</strong> LinkedIn banner dimensions are 1584 × 396 pixels.</li>
            <li><strong>File Size:</strong> Keep the banner under 8MB, preferably in PNG or JPG format.</li>
          </ul>
        </div>
        
        <div className="mb-8 bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Instructions:</h2>
          <ol className="list-decimal pl-6 text-gray-300 space-y-2">
            <li>Click the "Save Banner" button above</li>
            <li>Go to your LinkedIn profile</li>
            <li>Click the edit icon (pencil) on your profile banner</li>
            <li>Upload the saved banner image</li>
            <li>Adjust positioning if needed</li>
            <li>Save your changes</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default BannerPreview;
