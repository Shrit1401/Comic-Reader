"use client";

import { Card } from "@/components/ui/card";

export const MarvelReadingOrders = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Spider-Man */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-red-500">Spider-Man</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2">
              Essential Reading
            </h4>
            <ul className="space-y-2 text-sm">
              <li>1. Amazing Fantasy #15 (1962)</li>
              <li>2. Amazing Spider-Man #1-50</li>
              <li>3. The Night Gwen Stacy Died</li>
              <li>4. Kraven's Last Hunt</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2">
              Modern Era
            </h4>
            <ul className="space-y-2 text-sm">
              <li>5. Ultimate Spider-Man</li>
              <li>6. Spider-Man: Blue</li>
              <li>7. Superior Spider-Man</li>
              <li>8. Spider-Verse</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* X-Men */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-blue-500">X-Men</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-2">
              Classic Era
            </h4>
            <ul className="space-y-2 text-sm">
              <li>1. Giant-Size X-Men #1</li>
              <li>2. Dark Phoenix Saga</li>
              <li>3. Days of Future Past</li>
              <li>4. God Loves, Man Kills</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-2">
              Modern Stories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>5. House of M</li>
              <li>6. Messiah Complex</li>
              <li>7. House of X/Powers of X</li>
              <li>8. Inferno (2021)</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Avengers */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-yellow-500">Avengers</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">
              Classic Stories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>1. Avengers #1-16</li>
              <li>2. Kree-Skrull War</li>
              <li>3. Under Siege</li>
              <li>4. Operation: Galactic Storm</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">
              Modern Era
            </h4>
            <ul className="space-y-2 text-sm">
              <li>5. New Avengers</li>
              <li>6. Secret Invasion</li>
              <li>7. Infinity</li>
              <li>8. Secret Wars (2015)</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Iron Man */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-red-500">Iron Man</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2">
              Essential Reading
            </h4>
            <ul className="space-y-2 text-sm">
              <li>1. Tales of Suspense #39</li>
              <li>2. Demon in a Bottle</li>
              <li>3. Armor Wars</li>
              <li>4. Extremis</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2">
              Modern Era
            </h4>
            <ul className="space-y-2 text-sm">
              <li>5. Invincible Iron Man</li>
              <li>6. Iron Man: Director of S.H.I.E.L.D.</li>
              <li>7. Superior Iron Man</li>
              <li>8. Iron Man 2020</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Thor */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-blue-500">Thor</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-2">
              Classic Stories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>1. Journey into Mystery #83</li>
              <li>2. The Mighty Thor #337-382</li>
              <li>3. The Ballad of Beta Ray Bill</li>
              <li>4. Thor: God of Thunder</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-2">
              Modern Era
            </h4>
            <ul className="space-y-2 text-sm">
              <li>5. Thor (2014)</li>
              <li>6. The Mighty Thor (2015)</li>
              <li>7. War of the Realms</li>
              <li>8. Thor (2020)</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Captain America */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-blue-500">
          Captain America
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-2">
              Essential Reading
            </h4>
            <ul className="space-y-2 text-sm">
              <li>1. Captain America Comics #1</li>
              <li>2. The Winter Soldier</li>
              <li>3. The Death of Captain America</li>
              <li>4. Captain America: Reborn</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-2">
              Modern Era
            </h4>
            <ul className="space-y-2 text-sm">
              <li>5. Captain America (2018)</li>
              <li>6. Captain America: Sentinel of Liberty</li>
              <li>7. Captain America: Symbol of Truth</li>
              <li>8. Captain America: Cold War</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
