export const getDayFunction= function(ch){
    const c= ch.getDay(ch);
    console.log(c);
    switch(c){
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Satday"
        default:
            return "wrong date"
    }
};

export const getIconName= function(abbr){
    if(abbr=='c')
    {
        return 0;
    }
    else if(abbr=='h')
    {
        return 1;
    }
    else if(abbr=='hc')
    {
        return 2;
    }
    else if(abbr=='hr')
    {
        return 3;
    }
    else if(abbr=='lc')
    {
        return 4;
    }
    else if(abbr=='lr')
    {
        return 5;
    }
    else if(abbr=='s')
    {
        return 6;
    }
    else if(abbr=='sl')
    {
        return 7;
    }
    else if(abbr=='sn')
    {
        return 8;
    }
    else if(abbr=='t')
    {
        return 9;
    }
}