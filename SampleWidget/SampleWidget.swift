import WidgetKit
import SwiftUI

struct VerseModel: Codable {
    let title: String
    let arabicText: String
    let translation: String
    let surah: String
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let verse: VerseModel
}

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), verse: VerseModel(
            title: "NUR QUR'ON",
            arabicText: "﴿ فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾",
            translation: "Albatta, qiyinchilik bilan birga yengillik bordir.",
            surah: "Ash-Sharh · 94:5"
        ))
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = loadVerseFromAppGroup()
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let entry = loadVerseFromAppGroup()
        let timeline = Timeline(entries: [entry], policy: .atEnd)
        completion(timeline)
    }
    
    private func loadVerseFromAppGroup() -> SimpleEntry {
        let userDefaults = UserDefaults(suiteName: "group.com.oziyedu.sampleapp")
        if let jsonString = userDefaults?.string(forKey: "widget_verse_data"),
           let data = jsonString.data(using: .utf8),
           let verse = try? JSONDecoder().decode(VerseModel.self, from: data) {
            return SimpleEntry(date: Date(), verse: verse)
        }
        return placeholder(in: Context())
    }
}

struct SampleWidgetEntryView : View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        switch family {
        case .accessoryRectangular:
            VStack(alignment: .leading, spacing: 2) {
                Text(entry.verse.surah).font(.caption2).bold()
                Text(entry.verse.arabicText).font(.footnote).lineLimit(1)
            }
            
        case .systemSmall:
            VStack(alignment: .leading, spacing: 8) {
                Text(entry.verse.arabicText)
                    .font(.system(size: 13, weight: .bold))
                    .foregroundColor(.white)
                    .lineLimit(3)
                Spacer()
                Text(entry.verse.surah)
                    .font(.caption2)
                    .foregroundColor(Color.green.opacity(0.8))
            }
            .padding()
            .background(Color(red: 0.06, green: 0.22, blue: 0.17))

        case .systemMedium:
            VStack(spacing: 6) {
                HStack {
                    Text(entry.verse.title).font(.caption).bold()
                    Spacer()
                    Text("Kun Oyati").font(.caption2).foregroundColor(.orange)
                }
                Spacer()
                Text(entry.verse.arabicText)
                    .font(.title3)
                    .multilineTextAlignment(.center)
                Text(entry.verse.translation)
                    .font(.caption)
                    .foregroundColor(.gray)
                    .lineLimit(2)
                Spacer()
                HStack {
                    Text(entry.verse.surah).font(.caption2).bold()
                    Spacer()
                }
            }
            .padding()

        default:
            Text(entry.verse.arabicText)
        }
    }
}

@main
struct SampleWidget: Widget {
    let kind: String = "SampleWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            SampleWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Kun Oyati")
        .description("Qur'on oyatlarini vidjetda ko'rish.")
        .supportedFamilies([
            .systemSmall,
            .systemMedium,
            .accessoryRectangular
        ])
    }
}