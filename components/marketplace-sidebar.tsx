import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export function MarketplaceSidebar() {
  const classes = ["Beast", "Plant", "Aquatic", "Bird", "Bug", "Reptile"]
  const parts = ["Eyes", "Ears", "Horn", "Mouth", "Back", "Tail"]

  return (
    <div className="space-y-4">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-white font-medium mb-3">Price Range (ETH)</h3>
            <Slider defaultValue={[0.01, 10]} max={50} min={0.001} step={0.001} className="w-full" />
            <div className="flex justify-between text-sm text-white/70 mt-2">
              <span>0.001 ETH</span>
              <span>50 ETH</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-3">Class</h3>
            <div className="space-y-2">
              {classes.map((cls) => (
                <div key={cls} className="flex items-center space-x-2">
                  <Checkbox id={cls} />
                  <label htmlFor={cls} className="text-white/80 text-sm">
                    {cls}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-3">Parts</h3>
            <div className="space-y-2">
              {parts.map((part) => (
                <div key={part} className="flex items-center space-x-2">
                  <Checkbox id={part} />
                  <label htmlFor={part} className="text-white/80 text-sm">
                    {part}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-3">Stats</h3>
            <div className="space-y-3">
              <div>
                <label className="text-white/80 text-sm">HP</label>
                <Slider defaultValue={[27]} max={61} min={27} className="mt-1" />
              </div>
              <div>
                <label className="text-white/80 text-sm">Speed</label>
                <Slider defaultValue={[31]} max={67} min={31} className="mt-1" />
              </div>
              <div>
                <label className="text-white/80 text-sm">Skill</label>
                <Slider defaultValue={[31]} max={67} min={31} className="mt-1" />
              </div>
              <div>
                <label className="text-white/80 text-sm">Morale</label>
                <Slider defaultValue={[27]} max={61} min={27} className="mt-1" />
              </div>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
            Apply Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
