package de.overwatch.otd.game.events;


public class DefenderSpawned extends GameEvent{

    private int time;
    private String towerType;
    private int x,y;

    public DefenderSpawned(int elementId) {
        super(elementId);
    }

    @Override
    public String getType() {
        return EVENT_TYPE_DEFENDERSPAWN;
    }

    @Override
    public String toString() {
        return "AttackerSpawned{" +
                "time=" + time +
                ", towerType='" + towerType + '\'' +
                ", x=" + x +
                ", y=" + y +
                "} " + super.toString();
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public String getTowerType() {
        return towerType;
    }

    public void setTowerType(String towerType) {
        this.towerType = towerType;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
}
