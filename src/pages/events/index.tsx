import { formatRelative } from "date-fns";

const AGENDA_SCALE = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
const HEIGHT_PER_SLOT = 15; // 15px per 15min slot


const graduationStyle: (index:number) => React.HTMLAttributes<HTMLDivElement>['style'] = (index) => ({
    height: HEIGHT_PER_SLOT * 4,
    borderTop: '1px solid lightgrey',
    fontSize: 12,
    color: 'darkgrey',
});

export default function Events() {
    return (
        <div className="mx-auto w-96">
            <h1 className="mt-8">Events for today</h1>
            <div className="relative mt-8">
                {/** Agenda background */}
                {AGENDA_SCALE.map((graduation, index) => (
                    <div style={graduationStyle(index)}>{graduation}</div>)
                )}
                {/** events */}
            </div>
        </div>
    );
}