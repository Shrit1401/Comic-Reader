"use client";

import { Card } from "@/components/ui/card";

export const DCReadingOrders = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Batman */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-yellow-500">Batman</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">
              Year One & Early Years
            </h4>
            <ul className="space-y-2 text-sm">
              <li>1. Year One</li>
              <li>2. The Long Halloween</li>
              <li>3. Dark Victory</li>
              <li>4. The Killing Joke</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">
              Modern Era
            </h4>
            <ul className="space-y-2 text-sm">
              <li>5. Hush</li>
              <li>6. The Dark Knight Returns</li>
              <li>7. Court of Owls</li>
              <li>8. Batman: Three Jokers</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Superman */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-blue-500">Superman</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-2">
              Essential Stories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>1. Man of Steel</li>
              <li>2. Birthright</li>
              <li>3. All-Star Superman</li>
              <li>4. For All Seasons</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-2">
              Modern Era
            </h4>
            <ul className="space-y-2 text-sm">
              <li>5. Superman: Secret Identity</li>
              <li>6. Superman: Red Son</li>
              <li>7. Action Comics (New 52)</li>
              <li>8. Superman: Up in the Sky</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Justice League */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-red-500">Justice League</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2">
              Classic Stories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>1. Justice League: Origin</li>
              <li>2. Tower of Babel</li>
              <li>3. Identity Crisis</li>
              <li>4. Crisis on Infinite Earths</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2">
              Modern Era
            </h4>
            <ul className="space-y-2 text-sm">
              <li>5. New 52 Justice League</li>
              <li>6. Darkseid War</li>
              <li>7. Justice League Dark</li>
              <li>8. Justice League: No Justice</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Wonder Woman */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-red-500">Wonder Woman</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2">
              Essential Reading
            </h4>
            <ul className="space-y-2 text-sm">
              <li>1. Wonder Woman: Gods and Mortals</li>
              <li>2. The Hiketeia</li>
              <li>3. Wonder Woman: The Circle</li>
              <li>4. Wonder Woman: The True Amazon</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2">
              Modern Era
            </h4>
            <ul className="space-y-2 text-sm">
              <li>5. Wonder Woman (2016)</li>
              <li>6. Wonder Woman: Dead Earth</li>
              <li>7. Wonder Woman: Historia</li>
              <li>8. Wonder Woman (2023)</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Flash */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-red-500">Flash</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2">
              Classic Stories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>1. Flash: Born to Run</li>
              <li>2. The Return of Barry Allen</li>
              <li>3. Terminal Velocity</li>
              <li>4. Flash: Rebirth</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2">
              Modern Era
            </h4>
            <ul className="space-y-2 text-sm">
              <li>5. Flash (2016)</li>
              <li>6. Flashpoint</li>
              <li>7. The Flash: Year One</li>
              <li>8. The Flash (2023)</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Green Lantern */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-green-500">Green Lantern</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-green-400 mb-2">
              Essential Reading
            </h4>
            <ul className="space-y-2 text-sm">
              <li>1. Emerald Dawn</li>
              <li>2. Emerald Twilight</li>
              <li>3. Green Lantern: Rebirth</li>
              <li>4. Sinestro Corps War</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-green-400 mb-2">
              Modern Era
            </h4>
            <ul className="space-y-2 text-sm">
              <li>5. Blackest Night</li>
              <li>6. Brightest Day</li>
              <li>7. Green Lantern (2018)</li>
              <li>8. Green Lantern (2023)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
